import React, { useState } from 'react';
import { Check, Globe, List, Send, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import SitemapInput from './components/SitemapInput';
import UrlExtraction from './components/UrlExtraction';
import UrlSelection from './components/UrlSelection';
import IndexNowConfig from './components/IndexNowConfig';
import SubmissionResults from './components/SubmissionResults';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [extractedUrls, setExtractedUrls] = useState<ExtractedUrl[]>([]);
  const [indexNowConfig, setIndexNowConfig] = useState<IndexNowConfig>({
    host: '',
    key: '',
    keyLocation: ''
  });
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const steps = [
    { number: 1, title: 'Sitemap URL', icon: Globe, description: 'Enter your sitemap URL' },
    { number: 2, title: 'Extract URLs', icon: List, description: 'Parse and extract URLs' },
    { number: 3, title: 'Select URLs', icon: Check, description: 'Choose up to 100 URLs' },
    { number: 4, title: 'Configure API', icon: Send, description: 'IndexNow settings' },
    { number: 5, title: 'Results', icon: Check, description: 'Submission results' }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IndexNow Sitemap Submitter</h1>
          <p className="text-gray-600">Submit your sitemap URLs to search engines using IndexNow API</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}

export default App;

export { IndexNowConfig }