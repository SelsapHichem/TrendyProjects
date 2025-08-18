import React, { useState } from 'react';
import { Search, TrendingUp, Globe, Users, Calendar, Target } from 'lucide-react';

const TrendAnalyzer = ({ onTrendAnalyzed }) => {
  const [formData, setFormData] = useState({
    domain: '',
    country: '',
    ageRange: '',
    interests: '',
    incomeLevel: '',
    complexity: 'medium'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const domains = [
    'Technology', 'Fashion', 'Health & Wellness', 'Finance', 'Education',
    'Entertainment', 'Food & Beverage', 'Travel', 'Automotive', 'Real Estate',
    'E-commerce', 'Gaming', 'Sustainability', 'AI & Machine Learning', 'Blockchain'
  ];

  const countries = [
    'United States', 'United Kingdom', 'Germany', 'France', 'Japan',
    'China', 'India', 'Brazil', 'Australia', 'Canada', 'South Korea',
    'Netherlands', 'Singapore', 'Sweden', 'Switzerland'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTrends = generateMockTrends(formData);
    onTrendAnalyzed(mockTrends, formData);
    setIsAnalyzing(false);
  };

  const generateMockTrends = (data) => {
    const trendTemplates = {
      'Technology': [
        { name: 'AI-Powered Personal Assistants', score: 95, growth: '+45%' },
        { name: 'No-Code Development Platforms', score: 88, growth: '+32%' },
        { name: 'Edge Computing Solutions', score: 82, growth: '+28%' },
        { name: 'Quantum Computing Applications', score: 76, growth: '+55%' }
      ],
      'Health & Wellness': [
        { name: 'Mental Health Apps', score: 92, growth: '+38%' },
        { name: 'Personalized Nutrition', score: 86, growth: '+42%' },
        { name: 'Wearable Health Tech', score: 84, growth: '+25%' },
        { name: 'Telemedicine Platforms', score: 79, growth: '+35%' }
      ],
      'Finance': [
        { name: 'Cryptocurrency Trading Tools', score: 89, growth: '+48%' },
        { name: 'AI Financial Advisors', score: 85, growth: '+33%' },
        { name: 'Digital Banking Solutions', score: 81, growth: '+29%' },
        { name: 'ESG Investment Platforms', score: 77, growth: '+41%' }
      ]
    };

    return trendTemplates[data.domain] || trendTemplates['Technology'];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Trend Analysis Setup</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 inline mr-1" />
              Domain/Industry *
            </label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a domain</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Target Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Age Range
            </label>
            <select
              name="ageRange"
              value={formData.ageRange}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any age</option>
              <option value="18-24">18-24 (Gen Z)</option>
              <option value="25-34">25-34 (Millennials)</option>
              <option value="35-44">35-44 (Gen X)</option>
              <option value="45-54">45-54 (Gen X)</option>
              <option value="55+">55+ (Boomers)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income Level
            </label>
            <select
              name="incomeLevel"
              value={formData.incomeLevel}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any income level</option>
              <option value="low">Low Income</option>
              <option value="middle">Middle Income</option>
              <option value="high">High Income</option>
              <option value="luxury">Luxury Market</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Project Complexity
            </label>
            <select
              name="complexity"
              value={formData.complexity}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="simple">Simple (1 month)</option>
              <option value="medium">Medium (2 months)</option>
              <option value="complex">Complex (3 months)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests/Keywords
            </label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              placeholder="e.g., mobile apps, sustainability, social media"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing || !formData.domain || !formData.country}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing Trends...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Analyze Current Trends
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TrendAnalyzer;