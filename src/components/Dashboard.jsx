import React, { useState } from 'react';
import TrendAnalyzer from './TrendAnalyzer';
import TrendResults from './TrendResults';
import ProjectGenerator from './ProjectGenerator';
import DatabaseSchema from './DatabaseSchema';
import ProjectExport from './ProjectExport';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage';
import ReportsPage from './ReportsPage';
import { TrendingUp, Target, Database, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [analyzedTrends, setAnalyzedTrends] = useState(null);
  const [formData, setFormData] = useState(null);
  const [generatedProjects, setGeneratedProjects] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleTrendAnalyzed = (trends, data) => {
    setAnalyzedTrends(trends);
    setFormData(data);
    setCurrentStep(2);
  };

  const handleProjectsGenerated = (projects) => {
    setGeneratedProjects(projects);
    setCurrentStep(3);
  };

  // Handle page navigation from sidebar
  React.useEffect(() => {
    const handlePageChange = (event) => {
      setCurrentPage(event.detail.page);
    };
    
    window.addEventListener('pageChange', handlePageChange);
    return () => window.removeEventListener('pageChange', handlePageChange);
  }, []);

  // Render different pages based on currentPage
  if (currentPage === 'analytics') {
    return <AnalyticsPage trends={analyzedTrends} formData={formData} projects={generatedProjects} />;
  }
  
  if (currentPage === 'reports') {
    return <ReportsPage trends={analyzedTrends} formData={formData} projects={generatedProjects} />;
  }
  
  if (currentPage === 'settings') {
    return <SettingsPage />;
  }
  const steps = [
    { id: 1, name: 'Setup & Analysis', icon: TrendingUp, description: 'Configure parameters and analyze trends' },
    { id: 2, name: 'Trend Results', icon: Target, description: 'Review identified trends and market data' },
    { id: 3, name: 'Project Generation', icon: Lightbulb, description: 'Generate project specifications' },
    { id: 4, name: 'Database Schema', icon: Database, description: 'Review database design and structure' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-2">Current Trend Project Specs Generator</h1>
        <p className="text-blue-100">
          Analyze real-time trends, understand market conditions, and generate tailored project specifications 
          based on current opportunities and audience needs.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                } ${currentStep === step.id ? 'ring-4 ring-blue-200' : ''}`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.name}
                </p>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Navigation */}
      {(analyzedTrends || currentStep > 1) && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentStep === 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Setup & Analysis
            </button>
            {analyzedTrends && (
              <button
                onClick={() => setCurrentStep(2)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentStep === 2
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Trend Results
              </button>
            )}
            {analyzedTrends && (
              <button
                onClick={() => setCurrentStep(3)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentStep === 3
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Project Generation
              </button>
            )}
            {analyzedTrends && (
              <button
                onClick={() => setCurrentStep(4)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentStep === 4
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Database Schema
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step Content */}
      {currentStep === 1 && (
        <TrendAnalyzer onTrendAnalyzed={handleTrendAnalyzed} />
      )}

      {currentStep === 2 && analyzedTrends && (
        <TrendResults trends={analyzedTrends} formData={formData} />
      )}

      {currentStep === 3 && analyzedTrends && (
        <ProjectGenerator 
          trends={analyzedTrends} 
          formData={formData}
          onProjectsGenerated={handleProjectsGenerated}
        />
      )}

      {currentStep === 4 && analyzedTrends && (
        <DatabaseSchema 
          trends={analyzedTrends} 
          formData={formData}
          projects={generatedProjects}
        />
      )}

      {/* Export Component - Show when projects are generated */}
      {generatedProjects && generatedProjects.length > 0 && currentStep >= 3 && (
        <ProjectExport 
          projects={generatedProjects}
          trends={analyzedTrends}
          formData={formData}
        />
      )}
      {/* Features Overview - Only show initially */}
      {currentStep === 1 && !analyzedTrends && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Real-time Trend Analysis</h3>
            </div>
            <p className="text-gray-600">
              Analyze current trends across 15+ domains with popularity scoring, growth rates, and geographic relevance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Audience Targeting</h3>
            </div>
            <p className="text-gray-600">
              Understand demographics, preferences, and behavioral patterns to align projects with target audiences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-8 h-8 text-yellow-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Project Specifications</h3>
            </div>
            <p className="text-gray-600">
              Generate detailed project specs with technical requirements, timelines, success metrics and market opportunities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Database Design</h3>
            </div>
            <p className="text-gray-600">
              Complete database schema with proper relationships, indexes, and data persistence strategy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">AI-Powered Insights</h3>
            </div>
            <p className="text-gray-600">
              Leverage artificial intelligence to identify patterns, predict opportunities, and generate actionable recommendations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">🌍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Global Market Context</h3>
            </div>
            <p className="text-gray-600">
              Country-specific considerations including regulations, cultural factors, and economic indicators.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;