import React, { useState } from 'react';
import { 
  Rocket, 
  Zap, 
  Clock, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Globe, 
  TrendingUp, 
  Shield, 
  Users,
  Sparkles,
  Timer,
  Target,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Crown
} from 'lucide-react';

const AutomatePage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');

  const searchEngines = [
    { name: 'Microsoft Bing', logo: '🔍', market: '~12% market share' },
    { name: 'Yandex', logo: '🌐', market: '~65% in Russia' },
    { name: 'Seznam.cz', logo: '📍', market: '~15% in Czech Republic' },
    { name: 'IndexNow Network', logo: '⚡', market: 'Growing ecosystem' }
  ];

  const features = [
    {
      icon: RefreshCw,
      title: 'Automated Monitoring',
      description: 'Continuously monitors your sitemap.xml for new content',
      free: false,
      premium: true
    },
    {
      icon: Zap,
      title: 'Instant Submissions',
      description: 'Submits new URLs within minutes of detection',
      free: false,
      premium: true
    },
    {
      icon: BarChart3,
      title: 'Submission Analytics',
      description: 'Track submission history and success rates',
      free: false,
      premium: true
    },
    {
      icon: Shield,
      title: 'Reliable Infrastructure',
      description: '99.9% uptime with redundant monitoring systems',
      free: false,
      premium: true
    },
    {
      icon: Timer,
      title: 'Smart Scheduling',
      description: 'Optimized timing to avoid rate limits',
      free: false,
      premium: true
    },
    {
      icon: Target,
      title: 'Priority Support',
      description: 'Direct email support with 24-hour response time',
      free: false,
      premium: true
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'SEO Manager',
      company: 'TechStartup Inc.',
      content: 'Our new blog posts get indexed 3x faster since using the automation service. It\'s a game-changer for our content strategy.',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Digital Marketer',
      company: 'E-commerce Pro',
      content: 'Set it and forget it! Our product pages are now getting indexed automatically. Worth every penny.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Content Creator',
      company: 'BlogMaster',
      content: 'The manual tool was great, but automation saves me hours every week. My content gets discovered much faster now.',
      rating: 5
    }
  ];

  const faqItems = [
    {
      question: 'How does the automation work?',
      answer: 'Our system monitors your sitemap.xml file every hour for new URLs. When new content is detected, it automatically submits those URLs to search engines using the IndexNow protocol.'
    },
    {
      question: 'Which search engines will index my content?',
      answer: 'IndexNow is supported by Microsoft Bing, Yandex, Seznam.cz, and other search engines in the IndexNow network. While Google doesn\'t currently support IndexNow, these engines represent significant traffic opportunities.'
    },
    {
      question: 'What happens if I exceed 100 submissions?',
      answer: 'Each month you get 100 automatic submissions. If you publish more than 100 new pages, the oldest submissions are prioritized. You can always use our free manual tool for additional submissions.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes! You can cancel your subscription at any time. Your automation will continue until the end of your current billing period.'
    },
    {
      question: 'Do I need technical knowledge to set this up?',
      answer: 'Not at all! Just provide your website URL and API key (which you can generate using our free tool). We handle all the technical monitoring and submissions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
              <Crown className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Premium Automation Service</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Automate Your SEO
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                On Autopilot
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-purple-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Stop manually submitting URLs. Our premium service automatically monitors your sitemap 
              and submits new content to search engines within minutes of publication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span>100 Auto Submissions/Month</span>
              </div>
              <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                <Zap className="w-5 h-5 mr-2 text-yellow-300" />
                <span>Instant Indexing</span>
              </div>
              <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                <Shield className="w-5 h-5 mr-2 text-blue-300" />
                <span>99.9% Uptime</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">
                $5<span className="text-lg font-normal text-purple-200">/month per site</span>
              </div>
              <p className="text-purple-200">Cancel anytime • No setup fees • 7-day free trial</p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Stop Wasting Time on Manual Submissions
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Manual Process is Time-Consuming</h3>
                  <p className="text-gray-600">Manually checking for new content and submitting URLs takes hours every week</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Easy to Forget</h3>
                  <p className="text-gray-600">New content often goes unsubmitted, missing valuable indexing opportunities</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Delayed Discovery</h3>
                  <p className="text-gray-600">Search engines may take weeks to naturally discover your new content</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Automation Solution</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Monitors your sitemap 24/7</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Submits new URLs within minutes</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Works while you sleep</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Faster search engine discovery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Engines Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Supported Search Engines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IndexNow protocol is supported by major search engines worldwide, 
              giving your content instant visibility across multiple platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchEngines.map((engine, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-4xl mb-4">{engine.logo}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{engine.name}</h3>
                <p className="text-sm text-gray-600">{engine.market}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              <strong>Note:</strong> While Google doesn't currently support IndexNow, 
              these search engines represent significant traffic opportunities for your website.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600">
            Start with our free tool or upgrade to premium automation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Manual Tool</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
              <p className="text-gray-600">Perfect for occasional submissions</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>Manual URL submission</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>Up to 100 URLs per submission</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>Sitemap URL extraction</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>API key generator</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>Basic support</span>
              </div>
            </div>
            
            <button
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Use Free Tool
            </button>
          </div>
          
          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl text-white p-8 relative">
            <div className="absolute top-4 right-4">
              <div className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Premium Automation</h3>
              <div className="text-4xl font-bold mb-2">
                $5<span className="text-lg font-normal">/month</span>
              </div>
              <p className="text-purple-100">Per website • Cancel anytime</p>
            </div>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>{feature.description}</span>
                </div>
              ))}
            </div>
            
            <a
              href="https://buy.stripe.com/8x25kD4KqbXmgxX8qT9R60m"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-purple-600 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-bold text-lg flex items-center justify-center"
            >
              Upgrade to Premium
            </a>
            
            <p className="text-center text-purple-200 text-sm mt-4">
              Setup in 5 minutes • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {/* Features Deep Dive */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Premium Automation Works
            </h2>
            <p className="text-xl text-gray-600">
              Set it up once, and let our system handle the rest
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Setup Your Site</h3>
              <p className="text-gray-600">
                Provide your website URL and IndexNow API key. Our system validates 
                your setup and begins monitoring your sitemap.xml file.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Continuous Monitoring</h3>
              <p className="text-gray-600">
                Our system checks your sitemap every hour for new URLs. When new content 
                is detected, it's automatically queued for submission.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Instant Submission</h3>
              <p className="text-gray-600">
                New URLs are submitted to search engines within minutes using the 
                IndexNow protocol, ensuring fast discovery and indexing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Join hundreds of satisfied customers who've automated their SEO workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Automate Your SEO?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of websites already using our automation service. 
            Start your free trial today and see the difference automation makes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="https://buy.stripe.com/8x25kD4KqbXmgxX8qT9R60m"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-bold text-lg flex items-center"
            >
              Upgrade to Premium
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            
            <button
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-white border-2 border-white px-8 py-4 rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Try Free Tool First
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-purple-200">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatePage;