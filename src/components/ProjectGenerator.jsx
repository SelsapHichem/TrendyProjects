import React, { useState } from 'react';
import { Lightbulb, Target, Clock, DollarSign, BarChart3, Globe, AlertCircle, CheckCircle } from 'lucide-react';
import { ProjectGenerationController } from '../modules/project-generation/controllers/ProjectGenerationController';
import { LoadingSpinner } from '../common/components/LoadingSpinner';

const ProjectGenerator = ({ trends, formData }) => {
  const [generatedProjects, setGeneratedProjects] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [controller] = useState(() => ProjectGenerationController.getInstance());

  React.useEffect(() => {
    const handleProjectGenerated = (data) => {
      setGeneratedProjects(data.projects.map(p => p.toJSON()));
      setIsGenerating(false);
    };

    const handleError = (data) => {
      console.error('Project generation error:', data.error);
      setIsGenerating(false);
    };

    const handleLoadingChange = (data) => {
      setIsGenerating(data.isLoading);
    };

    const unsubscribeGenerated = controller.emitEvent = (event, data) => {
      if (event === 'PROJECT_GENERATION_COMPLETED') handleProjectGenerated(data);
      if (event === 'PROJECT_GENERATION_ERROR') handleError(data);
      if (event === 'LOADING_STATE_CHANGED') handleLoadingChange(data);
    };

    return () => {
      // Cleanup would go here in a real implementation
    };
  }, [controller]);
  const generateProjects = async () => {
    setIsGenerating(true);
    try {
      await controller.generateProjects(trends, formData);
    } catch (error) {
      console.error('Failed to generate projects:', error);
      setIsGenerating(false);
    }
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
              <LoadingSpinner size="small" text="Generating..." />
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
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">{project.targetAudience}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <BarChart3 className="w-4 h-4 text-green-600 mr-2" />
                      <h5 className="font-medium text-gray-800">Trend Alignment</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.alignedTrends?.map((trend, idx) => (
                        <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {trend}
                        </span>
                      )) || <span className="text-xs text-gray-500">No aligned trends</span>}
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
              
              {/* Project Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      High Viability
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formData?.complexity || 'Medium'} Complexity
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                    <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                      Start Project
                    </button>
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