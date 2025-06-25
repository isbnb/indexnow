import React from 'react';
import { Heart, ExternalLink, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About IndexNow Submitter</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A powerful tool to submit your sitemap URLs directly to search engines using the IndexNow protocol. 
              Speed up your content discovery and improve your SEO workflow.
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
            <div className="space-y-2">
              <a
                href="https://www.indexnow.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                IndexNow Documentation
              </a>
              <a
                href="https://www.indexnow.org/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                FAQ & Support
              </a>
              <a
                href="https://blogs.bing.com/webmaster/october-2021/IndexNow-instantly-index-your-web-content-in-search-engines"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Bing Webmaster Blog
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Extract URLs from XML sitemaps
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Select up to 100 URLs per submission
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Instant search engine notification
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Mobile-friendly interface
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>for better SEO workflows</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                © 2025 IndexNow Submitter
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
