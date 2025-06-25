import React from 'react';
import { Home, Search, ArrowLeft, AlertTriangle, Key, Globe } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const NotFound: React.FC = () => {
  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigateToApi = () => {
    window.history.pushState({}, '', '/api');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const popularPages = [
    {
      title: 'Sitemap Submitter',
      description: 'Submit your sitemap URLs to search engines',
      icon: Globe,
      action: navigateToHome,
      color: 'blue'
    },
    {
      title: 'API Key Generator',
      description: 'Generate IndexNow API keys',
      icon: Key,
      action: navigateToApi,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-8xl sm:text-9xl font-bold text-gray-200 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Sorry, we couldn't find the page you're looking for. The page might have been moved, 
              deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={navigateToHome}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Popular Pages
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {popularPages.map((page, index) => {
                const Icon = page.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-900',
                  purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-900'
                };
                
                return (
                  <button
                    key={index}
                    onClick={page.action}
                    className={`${colorClasses[page.color as keyof typeof colorClasses]} border rounded-lg p-6 transition-all duration-200 text-left group`}
                  >
                    <div className="flex items-start">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                        page.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          page.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 group-hover:underline">
                          {page.title}
                        </h3>
                        <p className="text-sm opacity-80">
                          {page.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Looking for something specific?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Try using our main navigation or check out our popular tools above.
            </p>
            <div className="text-xs text-gray-500">
              If you believe this is an error, please contact support.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;