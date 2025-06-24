import React, { useState } from 'react';
import { Send, ArrowLeft, AlertCircle, Loader2, Key, Globe, Link } from 'lucide-react';
import { ExtractedUrl, IndexNowConfig as IIndexNowConfig, SubmissionResult } from '../App';

interface IndexNowConfigProps {
  config: IIndexNowConfig;
  setConfig: (config: IIndexNowConfig) => void;
  selectedUrls: ExtractedUrl[];
  onSubmit: (result: SubmissionResult) => void;
  onBack: () => void;
}

const IndexNowConfig: React.FC<IndexNowConfigProps> = ({
  config,
  setConfig,
  selectedUrls,
  onSubmit,
  onBack
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateConfig = () => {
    const newErrors: Record<string, string> = {};

    if (!config.host.trim()) {
      newErrors.host = 'Host is required';
    } else if (!config.host.includes('.')) {
      newErrors.host = 'Please enter a valid domain (e.g., example.com)';
    }

    if (!config.key.trim()) {
      newErrors.key = 'API key is required';
    } else if (config.key.length < 16) {
      newErrors.key = 'API key should be at least 16 characters long';
    }

    if (!config.keyLocation.trim()) {
      newErrors.keyLocation = 'Key location URL is required';
    } else {
      try {
        new URL(config.keyLocation);
      } catch {
        newErrors.keyLocation = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToIndexNow = async () => {
    if (!validateConfig()) return;

    setLoading(true);
    
    try {
      const selectedUrlStrings = selectedUrls.map(url => url.url);
      
      const payload = {
        host: config.host,
        key: config.key,
        keyLocation: config.keyLocation,
        urlList: selectedUrlStrings
      };

      // Use Netlify function instead of direct API call
      const functionUrl = '/.netlify/functions/submit-indexnow';
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onSubmit({
          success: true,
          message: `Successfully submitted ${selectedUrlStrings.length} URLs to IndexNow`,
          submittedUrls: selectedUrlStrings
        });
      } else {
        throw new Error(result.error || `HTTP ${response.status}: Unknown error`);
      }
    } catch (error) {
      onSubmit({
        success: false,
        message: 'Failed to submit URLs to IndexNow',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = (field: keyof IIndexNowConfig, value: string) => {
    setConfig({ ...config, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const generateKeyLocation = () => {
    if (config.host && config.key) {
      const protocol = config.host.startsWith('localhost') ? 'http' : 'https';
      const cleanHost = config.host.replace(/^https?:\/\//, '');
      return `${protocol}://${cleanHost}/${config.key}.txt`;
    }
    return '';
  };

  const autoFillKeyLocation = () => {
    const generated = generateKeyLocation();
    if (generated) {
      updateConfig('keyLocation', generated);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure IndexNow API</h2>
          <p className="text-gray-600">
            Set up your IndexNow API credentials to submit {selectedUrls.length} selected URLs to search engines.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">Before you continue:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Generate an API key (32-64 character alphanumeric string)</li>
            <li>• Upload the API key as a text file to your website root</li>
            <li>• The file should be named {config.key && `"${config.key}.txt"`} and contain only the key</li>
            <li>• Ensure the key file is accessible at the URL you specify</li>
          </ul>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submitToIndexNow(); }} className="space-y-6">
          {/* Host */}
          <div>
            <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Website Host
            </label>
            <input
              type="text"
              id="host"
              value={config.host}
              onChange={(e) => updateConfig('host', e.target.value)}
              placeholder="example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.host ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.host && (
              <div className="mt-1 flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.host}
              </div>
            )}
          </div>

          {/* API Key */}
          <div>
            <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-2">
              <Key className="w-4 h-4 inline mr-1" />
              IndexNow API Key
            </label>
            <input
              type="text"
              id="key"
              value={config.key}
              onChange={(e) => updateConfig('key', e.target.value)}
              placeholder="32846add29c74fa1aeab5a17b606b494"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-mono ${
                errors.key ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.key && (
              <div className="mt-1 flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.key}
              </div>
            )}
            <p className="mt-1 text-sm text-gray-500">
              A 32-64 character alphanumeric string that you've uploaded to your website
            </p>
          </div>

          {/* Key Location */}
          <div>
            <label htmlFor="keyLocation" className="block text-sm font-medium text-gray-700 mb-2">
              <Link className="w-4 h-4 inline mr-1" />
              Key Location URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                id="keyLocation"
                value={config.keyLocation}
                onChange={(e) => updateConfig('keyLocation', e.target.value)}
                placeholder="https://example.com/32846add29c74fa1aeab5a17b606b494.txt"
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.keyLocation ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              <button
                type="button"
                onClick={autoFillKeyLocation}
                disabled={!config.host || !config.key}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Auto-fill
              </button>
            </div>
            {errors.keyLocation && (
              <div className="mt-1 flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.keyLocation}
              </div>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Full URL where your API key file is accessible
            </p>
          </div>

          {/* URL Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">URLs to Submit ({selectedUrls.length})</h3>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {selectedUrls.slice(0, 5).map((urlObj, index) => (
                <div key={index} className="text-sm text-gray-600 break-all">
                  {urlObj.url}
                </div>
              ))}
              {selectedUrls.length > 5 && (
                <div className="text-sm text-gray-500 italic">
                  ... and {selectedUrls.length - 5} more URLs
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 flex items-center font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit to IndexNow
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexNowConfig;