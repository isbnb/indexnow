import React, { useState, useEffect } from 'react';
import { List, ArrowRight, ArrowLeft, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { ExtractedUrl } from '../App';

interface UrlExtractionProps {
  sitemapUrl: string;
  onUrlsExtracted: (urls: ExtractedUrl[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const UrlExtraction: React.FC<UrlExtractionProps> = ({
  sitemapUrl,
  onUrlsExtracted,
  onNext,
  onBack
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [urls, setUrls] = useState<ExtractedUrl[]>([]);
  const [success, setSuccess] = useState(false);

  const extractUrlsFromSitemap = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Since we can't directly fetch XML due to CORS, we'll use a CORS proxy
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(sitemapUrl)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.status}`);
      }
      
      const data = await response.json();
      const xmlContent = data.contents;
      
      // Parse XML content
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        throw new Error('Invalid XML format in sitemap');
      }
      
      // Extract URLs from different sitemap formats
      let extractedUrls: string[] = [];
      
      // Standard sitemap format
      const urlElements = xmlDoc.querySelectorAll('url > loc');
      if (urlElements.length > 0) {
        extractedUrls = Array.from(urlElements).map(el => el.textContent?.trim() || '');
      } else {
        // Sitemap index format
        const sitemapElements = xmlDoc.querySelectorAll('sitemap > loc');
        if (sitemapElements.length > 0) {
          // For sitemap index, we'll just extract the first level
          extractedUrls = Array.from(sitemapElements).map(el => el.textContent?.trim() || '');
        }
      }
      
      // Filter out empty URLs and duplicates
      const uniqueUrls = [...new Set(extractedUrls.filter(url => url))];
      
      if (uniqueUrls.length === 0) {
        throw new Error('No URLs found in the sitemap. Please check the sitemap format.');
      }
      
      const urlObjects: ExtractedUrl[] = uniqueUrls.map(url => ({
        url,
        selected: false
      }));
      
      setUrls(urlObjects);
      onUrlsExtracted(urlObjects);
      setSuccess(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract URLs from sitemap');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sitemapUrl) {
      extractUrlsFromSitemap();
    }
  }, [sitemapUrl]);

  const handleContinue = () => {
    if (urls.length > 0) {
      onNext();
    }
  };

  const handleRetry = () => {
    extractUrlsFromSitemap();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <List className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Extracting URLs</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Fetching and parsing your sitemap to extract all available URLs.
          </p>
        </div>

        {loading && (
          <div className="text-center py-8 sm:py-12">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-sm sm:text-base mb-2">Fetching sitemap from:</p>
            <p className="text-blue-600 text-sm break-all px-4">{sitemapUrl}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">This may take a few moments...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-medium text-red-900 mb-2">Error Extracting URLs</h3>
                <p className="text-red-800 mb-4 text-sm sm:text-base">{error}</p>
                <button
                  onClick={handleRetry}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {success && urls.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-medium text-green-900 mb-2">URLs Successfully Extracted</h3>
                <p className="text-green-800 mb-4 text-sm sm:text-base">
                  Found {urls.length} URLs in your sitemap. You can now select which ones to submit to search engines.
                </p>
                
                <div className="bg-white rounded-lg p-4 mb-4 max-h-48 sm:max-h-60 overflow-y-auto">
                  <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Preview of extracted URLs:</h4>
                  <div className="space-y-2">
                    {urls.slice(0, 10).map((urlObj, index) => (
                      <div key={index} className="text-xs sm:text-sm text-gray-600 break-all">
                        {urlObj.url}
                      </div>
                    ))}
                    {urls.length > 10 && (
                      <div className="text-xs sm:text-sm text-gray-500 italic">
                        ... and {urls.length - 10} more URLs
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 text-sm sm:text-base"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          {success && (
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center font-medium text-sm sm:text-base"
            >
              Select URLs
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlExtraction;