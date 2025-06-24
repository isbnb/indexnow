import React from 'react';
import { CheckCircle, XCircle, RefreshCw, ExternalLink, Copy } from 'lucide-react';
import { SubmissionResult } from '../App';

interface SubmissionResultsProps {
  result: SubmissionResult | null;
  onReset: () => void;
}

const SubmissionResults: React.FC<SubmissionResultsProps> = ({
  result,
  onReset
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!result) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No submission results available.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            result.success ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {result.success ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {result.success ? 'Submission Successful!' : 'Submission Failed'}
          </h2>
          <p className="text-gray-600">{result.message}</p>
        </div>

        {result.success && result.submittedUrls && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="font-medium text-green-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Successfully Submitted URLs ({result.submittedUrls.length})
            </h3>
            
            <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {result.submittedUrls.map((url, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div className="text-sm text-gray-700 break-all flex-1">
                      {url}
                    </div>
                    <div className="flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-1"
                        title="Open URL"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!result.success && result.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="font-medium text-red-900 mb-3 flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              Error Details
            </h3>
            <div className="bg-white rounded-lg p-4">
              <code className="text-sm text-red-800 break-all">{result.error}</code>
            </div>
            
            <div className="mt-4 p-4 bg-red-100 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Common Issues:</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• API key file is not accessible at the specified URL</li>
                <li>• API key format is incorrect (should be 32-64 alphanumeric characters)</li>
                <li>• Host domain doesn't match the URLs you're trying to submit</li>
                <li>• Network connectivity issues or CORS restrictions</li>
                <li>• Rate limiting from the IndexNow API</li>
              </ul>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-medium text-blue-900 mb-3">What happens next?</h3>
          <div className="text-sm text-blue-800 space-y-2">
            {result.success ? (
              <>
                <p>• Search engines (Bing, Yandex, etc.) have been notified about your URLs</p>
                <p>• It may take some time for the URLs to be crawled and indexed</p>
                <p>• You can check your search console for indexing status updates</p>
                <p>• No further action is required from your side</p>
              </>
            ) : (
              <>
                <p>• Review the error details above and fix any configuration issues</p>
                <p>• Ensure your API key file is properly uploaded and accessible</p>
                <p>• Verify your domain settings and URL formats</p>
                <p>• Try submitting again after resolving the issues</p>
              </>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onReset}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center mx-auto font-medium"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Submit Another Sitemap
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Learn more about IndexNow at{' '}
            <a
              href="https://www.indexnow.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              indexnow.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;