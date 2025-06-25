import React from 'react';
import { Zap, Key, Rocket } from 'lucide-react';

const Header: React.FC = () => {
  const navigateToApi = () => {
    window.history.pushState({}, '', '/api');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigateToAutomate = () => {
    window.history.pushState({}, '', '/automate');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const currentPath = window.location.pathname;
  const isApiPage = currentPath === '/api' || currentPath === '/api/';
  const isAutomatePage = currentPath === '/automate' || currentPath === '/automate/';
  
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
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  IndexNow Submitter
                </p>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Fast-track your SEO with instant indexing
                </p>
              </div>
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={navigateToApi}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                isApiPage
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">API Key</span>
              <span className="sm:hidden">API</span>
            </button>
            
            <button
              onClick={navigateToAutomate}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base font-medium ${
                isAutomatePage
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span className="hidden sm:inline">Automate</span>
              <span className="sm:hidden">Pro</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
