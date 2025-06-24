import React, { useState } from 'react';
import { Globe, ArrowRight, AlertCircle } from 'lucide-react';

interface SitemapInputProps {
  sitemapUrl: string;
  setSitemapUrl: (url: string) => void;
  onNext: () => void;
}

const SitemapInput: React.FC<SitemapInputProps> = ({
  sitemapUrl,
  setSitemapUrl,
  onNext
}) => {
  const [error, setError] = useState('');

  const isValidUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!sitemapUrl.trim()) {
      setError('Please enter a sitemap URL');
      return;
    }

    if (!isValidUrl(sitemapUrl)) {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }

    if (!sitemapUrl.toLowerCase().includes('sitemap')) {
      setError('URL should contain "sitemap" in the path');
      return;
    }

    onNext();
  };

  const exampleUrls = [
    'https://example.com/sitemap.xml',
    'https://example.com/sitemap_index.xml',
    'https://example.com/sitemaps/sitemap.xml'
  ];

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Sitemap URL</h2>
          <p className="text-gray-600">
            Provide the URL to your XML sitemap. We'll extract all URLs for submission to search engines.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="sitemapUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Sitemap URL
            </label>
            <input
              type="url"
              id="sitemapUrl"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            {error && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Example sitemap URLs:</h3>
            <div className="space-y-2">
              {exampleUrls.map((url, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSitemapUrl(url)}
                  className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded transition-colors duration-200"
                >
                  {url}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center font-medium"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">What is a sitemap?</h3>
          <p className="text-sm text-blue-800">
            A sitemap is an XML file that lists all the pages on your website. Search engines use 
            sitemaps to discover and index your content more efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitemapInput;