import React, { useState } from 'react';
import { Key, Download, Copy, CheckCircle, RefreshCw, Globe, FileText, Code, ExternalLink, AlertCircle, Info } from 'lucide-react';

const ApiKeyGenerator: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const generateApiKey = () => {
    // Generate a secure 32-character alphanumeric API key
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApiKey(result);
    setDownloadReady(true);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (apiKey) {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadKeyFile = () => {
    if (!apiKey) return;
    
    const blob = new Blob([apiKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${apiKey}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const integrationSteps = [
    {
      title: 'Generate Your API Key',
      description: 'Click the "Generate API Key" button to create a secure 32-character key.',
      icon: Key,
      completed: !!apiKey
    },
    {
      title: 'Download the Key File',
      description: 'Download the text file containing your API key.',
      icon: Download,
      completed: downloadReady && !!apiKey
    },
    {
      title: 'Upload to Website Root',
      description: 'Upload the downloaded file to your website\'s root directory (same level as index.html).',
      icon: Globe,
      completed: false
    },
    {
      title: 'Verify File Access',
      description: 'Ensure the file is accessible at https://yoursite.com/[your-key].txt',
      icon: CheckCircle,
      completed: false
    },
    {
      title: 'Submit URLs',
      description: 'Use the IndexNow API or our submission tool to notify search engines.',
      icon: FileText,
      completed: false
    }
  ];

  const codeExamples = {
    curl: `curl -X POST "https://api.indexnow.org/IndexNow" \\
  -H "Content-Type: application/json" \\
  -d '{
    "host": "yoursite.com",
    "key": "${apiKey || 'your-generated-key'}",
    "keyLocation": "https://yoursite.com/${apiKey || 'your-generated-key'}.txt",
    "urlList": [
      "https://yoursite.com/page1",
      "https://yoursite.com/page2"
    ]
  }'`,
    javascript: `const submitToIndexNow = async (urls) => {
  const response = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      host: 'yoursite.com',
      key: '${apiKey || 'your-generated-key'}',
      keyLocation: 'https://yoursite.com/${apiKey || 'your-generated-key'}.txt',
      urlList: urls
    })
  });
  
  return response.ok;
};`,
    php: `<?php
$data = [
    'host' => 'yoursite.com',
    'key' => '${apiKey || 'your-generated-key'}',
    'keyLocation' => 'https://yoursite.com/${apiKey || 'your-generated-key'}.txt',
    'urlList' => [
        'https://yoursite.com/page1',
        'https://yoursite.com/page2'
    ]
];

$response = file_get_contents('https://api.indexnow.org/IndexNow', false, 
    stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/json',
            'content' => json_encode($data)
        ]
    ])
);
?>`
  };

  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>('curl');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              IndexNow API Key Generator
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Generate secure API keys for IndexNow protocol and learn how to integrate instant search engine notifications into your website.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* API Key Generation Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Generate Your API Key</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Create a secure 32-character alphanumeric key that will authenticate your IndexNow submissions.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">Your API Key:</label>
                <button
                  onClick={generateApiKey}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate New Key
                </button>
              </div>
              
              {apiKey ? (
                <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <code className="text-blue-900 font-mono text-sm sm:text-base break-all flex-1 mr-4">
                      {apiKey}
                    </code>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-sm font-medium"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadKeyFile}
                        className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 border-2 border-dashed border-gray-300 text-center">
                  <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Click "Generate New Key" to create your API key</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Integration Steps */}
        <div id="integration" className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Integration Steps</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Follow these steps to integrate IndexNow into your website and start notifying search engines instantly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {integrationSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                      step.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Important Security Notes</h3>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Keep your API key secure and don't share it publicly in your code repositories</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>The key file must be accessible via HTTPS for production websites</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>You can use the same key for multiple domains you own</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Generate a new key if you suspect it has been compromised</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Additional Resources */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Learn more about IndexNow and explore additional tools and documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <a
              href="https://www.indexnow.org/documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-blue-900">Official Documentation</h3>
              </div>
              <p className="text-blue-800 text-sm mb-4">
                Complete IndexNow API documentation with detailed specifications and examples.
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>Read Documentation</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </a>

            <a
              href="/"
              className="bg-green-50 border border-green-200 rounded-lg p-6 hover:bg-green-100 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-green-900">Sitemap Submitter</h3>
              </div>
              <p className="text-green-800 text-sm mb-4">
                Use our tool to extract URLs from your sitemap and submit them via IndexNow.
              </p>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <span>Try Submitter Tool</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </a>

            <a
              href="https://www.indexnow.org/faq"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-50 border border-purple-200 rounded-lg p-6 hover:bg-purple-100 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-4">
                <Info className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-purple-900">FAQ & Support</h3>
              </div>
              <p className="text-purple-800 text-sm mb-4">
                Find answers to common questions and get help with IndexNow implementation.
              </p>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <span>View FAQ</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyGenerator;