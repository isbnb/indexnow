import React from 'react';
import { Globe, Zap, Key } from 'lucide-react';

const Header: React.FC = () => {
  const navigateToApi = () => {
    window.history.pushState({}, '', '/api');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const isApiPage = window.location.pathname === '/api' || window.location.pathname === '/api/';
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={navigateToHome}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  IndexNow Submitter
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Fast-track your SEO with instant indexing
                </p>
              </div>
            </button>
          </div>
          {/* Navigation Links */}
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={navigateToApi}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                isApiPage
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">API Key Generator</span>
              <span className="sm:hidden">API</span>
            </button>
            
            <a
              href="https://www.indexnow.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline">IndexNow.org</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;