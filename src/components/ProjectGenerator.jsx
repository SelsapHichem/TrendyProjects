import React, { useState } from 'react';
import { Lightbulb, Target, Clock, DollarSign, BarChart3, Globe, AlertCircle, CheckCircle } from 'lucide-react';

const ProjectGenerator = ({ trends, formData }) => {
  const [generatedProjects, setGeneratedProjects] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProjects = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const projects = createProjectSpecs(trends, formData);
    setGeneratedProjects(projects);
    setIsGenerating(false);
  };

  const createProjectSpecs = (trends, data) => {
    const projectTemplates = {
      'Technology': [
        {
          title: 'AI-Powered Productivity Assistant',
          description: 'A smart assistant that integrates with popular work tools to optimize daily workflows',
          trends: ['AI-Powered Personal Assistants', 'No-Code Development Platforms'],
          audience: `Professionals aged ${data.ageRange || '25-45'} in ${data.country} seeking productivity solutions`,
          techRequirements: ['React/Vue.js frontend', 'Python/Node.js backend', 'OpenAI API integration', 'Cloud hosting'],
          timeline: getTimelineByComplexity(data.complexity),
          marketOpportunity: '$2.5B market size with 23% CAGR',
          successMetrics: ['User engagement rate > 70%', 'Monthly retention > 85%', 'Task completion improvement > 30%'],
          countryConsiderations: getCountryConsiderations(data.country, 'Technology')
        },
        {
          title: 'No-Code Business Automation Platform',
          description: 'Visual workflow builder for small businesses to automate repetitive tasks',
          trends: ['No-Code Development Platforms', 'AI-Powered Personal Assistants'],
          audience: `Small business owners in ${data.country} looking to streamline operations`,
          techRequirements: ['Drag-and-drop interface', 'API integrations', 'Cloud infrastructure', 'Mobile app'],
          timeline: getTimelineByComplexity(data.complexity),
          marketOpportunity: '$1.8B addressable market with 35% growth rate',
          successMetrics: ['Customer acquisition cost < $50', 'Monthly churn rate < 5%', 'Feature adoption > 60%'],
          countryConsiderations: getCountryConsiderations(data.country, 'Technology')
        }
      ],
      'Health & Wellness': [
        {
          title: 'Mental Health Companion App',
          description: 'AI-driven mental wellness platform with personalized therapy sessions and mood tracking',
          trends: ['Mental Health Apps', 'Personalized Nutrition'],
          audience: `Health-conscious individuals aged ${data.ageRange || '18-35'} in ${data.country}`,
          techRequirements: ['Mobile app (iOS/Android)', 'AI chatbot', 'Data analytics', 'HIPAA compliance'],
          timeline: getTimelineByComplexity(data.complexity),
          marketOpportunity: '$4.2B mental health app market, growing at 20% annually',
          successMetrics: ['Daily active users > 10K', 'Session completion rate > 80%', 'User well-being improvement scores'],
          countryConsiderations: getCountryConsiderations(data.country, 'Health & Wellness')
        }
      ],
      'Finance': [
        {
          title: 'Crypto Portfolio Management Tool',
          description: 'Advanced analytics platform for cryptocurrency investment tracking and optimization',
          trends: ['Cryptocurrency Trading Tools', 'AI Financial Advisors'],
          audience: `Crypto investors aged ${data.ageRange || '25-40'} in ${data.country}`,
          techRequirements: ['Real-time data feeds', 'Advanced charting', 'Portfolio analytics', 'Security protocols'],
          timeline: getTimelineByComplexity(data.complexity),
          marketOpportunity: '$1.1B crypto management tools market with 45% growth',
          successMetrics: ['Assets under management > $10M', 'User portfolio performance improvement', 'Platform reliability 99.9%'],
          countryConsiderations: getCountryConsiderations(data.country, 'Finance')
        }
      ]
    };

    return projectTemplates[data.domain] || projectTemplates['Technology'];
  };

  const getTimelineByComplexity = (complexity) => {
    const timelines = {
      'simple': '4-6 weeks',
      'medium': '8-12 weeks', 
      'complex': '12-16 weeks'
    };
    return timelines[complexity] || '8-12 weeks';
  };

  const getCountryConsiderations = (country, domain) => {
    const considerations = {
      'United States': {
        'Technology': ['GDPR-like privacy laws emerging', 'High competition', 'Strong VC funding available'],
        'Health & Wellness': ['FDA regulations for health apps', 'HIPAA compliance required', 'Insurance integration opportunities'],
        'Finance': ['SEC regulations', 'State-level licensing', 'Strong fintech ecosystem']
      },
      'United Kingdom': {
        'Technology': ['GDPR compliance mandatory', 'Brexit impact on data flows', 'Government digital initiatives'],
        'Health & Wellness': ['NHS integration potential', 'NICE guidelines consideration', 'Data protection strict'],
        'Finance': ['FCA regulation', 'Open banking standards', 'Brexit financial services impact']
      },
      'Germany': {
        'Technology': ['Strict data protection laws', 'Industry 4.0 initiatives', 'Strong engineering culture'],
        'Health & Wellness': ['Medical device regulations', 'Social insurance system', 'Privacy-first approach'],
        'Finance': ['BaFin regulation', 'Conservative investment culture', 'Strong banking sector']
      }
    };

    return considerations[country]?.[domain] || ['Local regulations apply', 'Market research needed', 'Cultural adaptation required'];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <Lightbulb className="w-6 h-6 text-yellow-600 mr-2" />
          Project Specifications Generator
        </h3>
        {generatedProjects.length === 0 && (
          <button
            onClick={generateProjects}
            disabled={isGenerating}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 mr-2" />
                Generate Projects
              </>
            )}
          </button>
        )}
      </div>

      {generatedProjects.length > 0 && (
        <div className="space-y-8">
          {generatedProjects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h4>
                <p className="text-gray-600">{project.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Target className="w-4 h-4 text-blue-600 mr-2" />
                      <h5 className="font-medium text-gray-800">Target Audience</h5>
                    </div>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">{project.audience}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <BarChart3 className="w-4 h-4 text-green-600 mr-2" />
                      <h5 className="font-medium text-gray-800">Trend Alignment</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.trends.map((trend, idx) => (
                        <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {trend}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 text-orange-600 mr-2" />
                      <h5 className="font-medium text-gray-800">Estimated Timeline</h5>
                    </div>
                    <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded">{project.timeline}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-4 h-4 text-purple-600 mr-2" />
                      <h5 className="font-medium text-gray-800">Market Opportunity</h5>
                    </div>
                    <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded">{project.marketOpportunity}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                      <h5 className="font-medium text-gray-800">Technical Requirements</h5>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.techRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <BarChart3 className="w-4 h-4 text-indigo-600 mr-2" />
                      <h5 className="font-medium text-gray-800">Success Metrics</h5>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.successMetrics.map((metric, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Globe className="w-4 h-4 text-red-600 mr-2" />
                      <h5 className="font-medium text-gray-800">Country-Specific Considerations</h5>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.countryConsiderations.map((consideration, idx) => (
                        <li key={idx} className="flex items-center">
                          <AlertCircle className="w-3 h-3 text-red-400 mr-2" />
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGenerator;