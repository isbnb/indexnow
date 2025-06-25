import React, { useState } from 'react';
import { Check, Globe, List, Send, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import SitemapInput from './components/SitemapInput';
import UrlExtraction from './components/UrlExtraction';
import UrlSelection from './components/UrlSelection';
import IndexNowConfig from './components/IndexNowConfig';
import SubmissionResults from './components/SubmissionResults';
import ApiKeyGenerator from './components/ApiKeyGenerator';
import AutomatePage from './components/AutomatePage';
import NotFound from './components/NotFound';

export interface ExtractedUrl {
  url: string;
  selected: boolean;
}

export interface IndexNowConfig {
  host: string;
  key: string;
  keyLocation: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  submittedUrls?: string[];
  error?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'api' | 'automate' | '404'>('home');
  const [currentStep, setCurrentStep] = useState(1);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [extractedUrls, setExtractedUrls] = useState<ExtractedUrl[]>([]);
  const [indexNowConfig, setIndexNowConfig] = useState<IndexNowConfig>({
    host: '',
    key: '',
    keyLocation: ''
  });
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  // Check URL path to determine which page to show
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/api' || path === '/api/') {
      setCurrentPage('api');
    } else if (path === '/automate' || path === '/automate/') {
      setCurrentPage('automate');
    } else if (path === '/' || path === '') {
      setCurrentPage('home');
    } else {
      setCurrentPage('404');
    }

    // Handle browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/api' || path === '/api/') {
        setCurrentPage('api');
      } else if (path === '/automate' || path === '/automate/') {
        setCurrentPage('automate');
      } else if (path === '/' || path === '') {
        setCurrentPage('home');
      } else {
        setCurrentPage('404');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToApi = () => {
    window.history.pushState({}, '', '/api');
    setCurrentPage('api');
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPage('home');
  };

  const navigateToAutomate = () => {
    window.history.pushState({}, '', '/automate');
    setCurrentPage('automate');
  };

  if (currentPage === '404') {
    return <NotFound />;
  }

  if (currentPage === 'automate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <AutomatePage />
        </main>
        <Footer />
      </div>
    );
  }

  if (currentPage === 'api') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <ApiKeyGenerator />
        </main>
        <Footer />
      </div>
    );
  }

  const steps = [
    {
      number: 1,
      title: 'Sitemap URL',
      icon: Globe,
      description: 'Enter your sitemap URL',
      longDescription: 'Provide the URL to your XML sitemap file. We\'ll fetch and parse it to extract all available URLs.',
      color: 'blue'
    },
    {
      number: 2,
      title: 'Extract URLs',
      icon: List,
      description: 'Parse and extract URLs',
      longDescription: 'Our system will automatically parse your sitemap and extract all the URLs it contains.',
      color: 'purple'
    },
    {
      number: 3,
      title: 'Select URLs',
      icon: Check,
      description: 'Choose up to 100 URLs',
      longDescription: 'Review and select up to 100 URLs from your sitemap that you want to submit to search engines.',
      color: 'green'
    },
    {
      number: 4,
      title: 'Configure API',
      icon: Send,
      description: 'IndexNow settings',
      longDescription: 'Enter your IndexNow API credentials including your host, API key, and key location URL.',
      color: 'orange'
    },
    {
      number: 5,
      title: 'Results',
      icon: Check,
      description: 'Submission results',
      longDescription: 'Review the submission results and see which URLs were successfully submitted to search engines.',
      color: 'emerald'
    }
  ];

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setSitemapUrl('');
    setExtractedUrls([]);
    setIndexNowConfig({ host: '', key: '', keyLocation: '' });
    setSubmissionResult(null);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SitemapInput
            sitemapUrl={sitemapUrl}
            setSitemapUrl={setSitemapUrl}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <UrlExtraction
            sitemapUrl={sitemapUrl}
            onUrlsExtracted={setExtractedUrls}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <UrlSelection
            extractedUrls={extractedUrls}
            setExtractedUrls={setExtractedUrls}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <IndexNowConfig
            config={indexNowConfig}
            setConfig={setIndexNowConfig}
            selectedUrls={extractedUrls.filter(url => url.selected)}
            onSubmit={(result) => {
              setSubmissionResult(result);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <SubmissionResults
            result={submissionResult}
            onReset={resetWizard}
          />
        );
      default:
        return null;
    }
  };

  const getColorClasses = (color: string, isActive: boolean, isCompleted: boolean) => {
    const colors = {
      blue: {
        bg: isCompleted ? 'bg-blue-500' : isActive ? 'bg-blue-600' : 'bg-white',
        border: isCompleted ? 'border-blue-500' : isActive ? 'border-blue-600' : 'border-gray-300',
        text: isCompleted || isActive ? 'text-white' : 'text-gray-400',
        accent: 'text-blue-600'
      },
      purple: {
        bg: isCompleted ? 'bg-purple-500' : isActive ? 'bg-purple-600' : 'bg-white',
        border: isCompleted ? 'border-purple-500' : isActive ? 'border-purple-600' : 'border-gray-300',
        text: isCompleted || isActive ? 'text-white' : 'text-gray-400',
        accent: 'text-purple-600'
      },
      green: {
        bg: isCompleted ? 'bg-green-500' : isActive ? 'bg-green-600' : 'bg-white',
        border: isCompleted ? 'border-green-500' : isActive ? 'border-green-600' : 'border-gray-300',
        text: isCompleted || isActive ? 'text-white' : 'text-gray-400',
        accent: 'text-green-600'
      },
      orange: {
        bg: isCompleted ? 'bg-orange-500' : isActive ? 'bg-orange-600' : 'bg-white',
        border: isCompleted ? 'border-orange-500' : isActive ? 'border-orange-600' : 'border-gray-300',
        text: isCompleted || isActive ? 'text-white' : 'text-gray-400',
        accent: 'text-orange-600'
      },
      emerald: {
        bg: isCompleted ? 'bg-emerald-500' : isActive ? 'bg-emerald-600' : 'bg-white',
        border: isCompleted ? 'border-emerald-500' : isActive ? 'border-emerald-600' : 'border-gray-300',
        text: isCompleted || isActive ? 'text-white' : 'text-gray-400',
        accent: 'text-emerald-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <Header />
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Submit Your Sitemap to Search Engines
              </h2>
              <p className="text-blue-100 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
                Use IndexNow protocol to instantly notify search engines about your content updates. 
                Fast, reliable, and completely free.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={navigateToAutomate}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-200 flex items-center justify-center font-medium shadow-lg"
                >
                  Automate for $5/month
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                
                <button
                  onClick={navigateToApi}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-200 flex items-center justify-center font-medium"
                >
                  Generate API Key
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
              
              <p className="text-blue-200 text-sm mt-4">
                Try our free manual tool below or upgrade to premium automation
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Mobile Progress Indicator */}
          <div className="block sm:hidden mb-6">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-gray-600">Step {currentStep} of {steps.length}</span>
              <span className="text-gray-600">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="group relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  getColorClasses(steps[currentStep - 1].color, true, false).bg
                } ${getColorClasses(steps[currentStep - 1].color, true, false).border} border-2`}>
                  {(() => {
                    const Icon = steps[currentStep - 1].icon;
                    return <Icon className={`w-6 h-6 ${getColorClasses(steps[currentStep - 1].color, true, false).text}`} />;
                  })()}
                </div>
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-48 bg-gray-800 text-white text-xs rounded-lg p-3 hidden group-hover:block z-10">
                  {steps[currentStep - 1].longDescription}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{steps[currentStep - 1].title}</h3>
            </div>
          </div>

          {/* Desktop Progress Steps */}
          <div className="hidden sm:block mb-8 lg:mb-12">
            <div className="flex items-start justify-between">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                const colorClasses = getColorClasses(step.color, isActive, isCompleted);
                
                return (
                  <div key={step.number} className="flex flex-col items-center flex-1">
                    {/* Step Circle */}
                    <div className="group relative">
                      <div
                        className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                          colorClasses.bg
                        } ${colorClasses.border} border-2`}
                      >
                        {isCompleted ? (
                          <Check className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                        ) : (
                          <Icon className={`w-6 h-6 lg:w-7 lg:h-7 ${colorClasses.text}`} />
                        )}
                      </div>
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-48 bg-gray-800 text-white text-xs rounded-lg p-3 hidden group-hover:block z-10">
                        {step.longDescription}
                      </div>
                    </div>
                    
                    {/* Step Title */}
                    <div className="mt-3 text-center max-w-32 lg:max-w-40">
                      <div className={`text-sm lg:text-base font-semibold transition-colors duration-300 ${
                        isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {renderStepContent()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

export { IndexNowConfig };