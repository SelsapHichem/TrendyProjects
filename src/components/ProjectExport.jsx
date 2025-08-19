import React, { useState } from 'react';
import { Download, FileText, Code, Database, Mail, Share2 } from 'lucide-react';

const ProjectExport = ({ projects, trends, formData }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const exportData = generateExportData(format);
    downloadFile(exportData, format);
    setIsExporting(false);
  };

  const generateExportData = (format) => {
    const data = {
      projects: projects || [],
      trends: trends || [],
      formData: formData || {},
      generatedAt: new Date().toISOString(),
      summary: {
        totalProjects: projects?.length || 0,
        totalTrends: trends?.length || 0,
        domain: formData?.domain || 'N/A',
        country: formData?.country || 'N/A'
      }
    };

    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        return generateCSV(data);
      case 'markdown':
        return generateMarkdown(data);
      default:
        return JSON.stringify(data, null, 2);
    }
  };

  const generateCSV = (data) => {
    if (!data.projects || data.projects.length === 0) return 'No projects to export';
    
    const headers = ['Title', 'Description', 'Timeline', 'Market Opportunity', 'Tech Requirements'];
    const rows = data.projects.map(project => [
      project.title,
      project.description,
      project.timeline,
      project.marketOpportunity,
      project.techRequirements?.join('; ') || ''
    ]);
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  };

  const generateMarkdown = (data) => {
    let markdown = `# Project Specifications Report\n\n`;
    markdown += `**Generated:** ${new Date().toLocaleDateString()}\n`;
    markdown += `**Domain:** ${data.formData.domain}\n`;
    markdown += `**Country:** ${data.formData.country}\n\n`;
    
    if (data.projects && data.projects.length > 0) {
      markdown += `## Projects (${data.projects.length})\n\n`;
      data.projects.forEach((project, index) => {
        markdown += `### ${index + 1}. ${project.title}\n\n`;
        markdown += `${project.description}\n\n`;
        markdown += `**Timeline:** ${project.timeline}\n\n`;
        markdown += `**Market Opportunity:** ${project.marketOpportunity}\n\n`;
        if (project.techRequirements) {
          markdown += `**Technical Requirements:**\n`;
          project.techRequirements.forEach(req => markdown += `- ${req}\n`);
          markdown += '\n';
        }
      });
    }
    
    return markdown;
  };

  const downloadFile = (content, format) => {
    const mimeTypes = {
      json: 'application/json',
      csv: 'text/csv',
      markdown: 'text/markdown'
    };
    
    const extensions = {
      json: 'json',
      csv: 'csv',
      markdown: 'md'
    };
    
    const blob = new Blob([content], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-specs.${extensions[format]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareProject = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Project Specifications',
          text: 'Check out these project specifications generated from current trends',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <Download className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">Export & Share</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Export Formats</h4>
          <div className="space-y-3">
            <button
              onClick={() => handleExport('json')}
              disabled={isExporting}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <div className="flex items-center">
                <Code className="w-5 h-5 text-blue-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium">JSON Format</div>
                  <div className="text-sm text-gray-500">Structured data for developers</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleExport('csv')}
              disabled={isExporting}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <div className="flex items-center">
                <Database className="w-5 h-5 text-green-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium">CSV Format</div>
                  <div className="text-sm text-gray-500">Spreadsheet compatible</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleExport('markdown')}
              disabled={isExporting}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-purple-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Markdown</div>
                  <div className="text-sm text-gray-500">Documentation format</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Share Options</h4>
          <div className="space-y-3">
            <button
              onClick={shareProject}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Share2 className="w-5 h-5 text-blue-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Share Link</div>
                  <div className="text-sm text-gray-500">Share current analysis</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                const subject = encodeURIComponent('Project Specifications Report');
                const body = encodeURIComponent(`Check out these project specifications:\n\n${window.location.href}`);
                window.open(`mailto:?subject=${subject}&body=${body}`);
              }}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-green-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Email Report</div>
                  <div className="text-sm text-gray-500">Send via email</div>
                </div>
              </div>
            </button>
          </div>

          {isExporting && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-sm text-blue-700">Preparing export...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectExport;