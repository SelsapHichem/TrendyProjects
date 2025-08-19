import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, BarChart3, Users, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ReportsPage = ({ trends, formData, projects }) => {
  const [selectedReport, setSelectedReport] = useState('trend-analysis');
  const [dateRange, setDateRange] = useState('30d');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'trend-analysis',
      name: 'Trend Analysis Report',
      description: 'Comprehensive analysis of current trends and market opportunities',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      id: 'project-summary',
      name: 'Project Summary Report',
      description: 'Overview of generated projects and their specifications',
      icon: BarChart3,
      color: 'green'
    },
    {
      id: 'market-insights',
      name: 'Market Insights Report',
      description: 'Geographic and demographic market analysis',
      icon: Globe,
      color: 'purple'
    },
    {
      id: 'performance-metrics',
      name: 'Performance Metrics Report',
      description: 'Key performance indicators and success metrics',
      icon: Users,
      color: 'orange'
    }
  ];

  const generateReport = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reportData = createReportData(selectedReport, trends, formData, projects);
    downloadReport(reportData, selectedReport);
    setIsGenerating(false);
  };

  const createReportData = (reportType, trends, formData, projects) => {
    const baseData = {
      reportType,
      generatedAt: new Date().toISOString(),
      dateRange,
      summary: {
        totalTrends: trends?.length || 0,
        totalProjects: projects?.length || 0,
        domain: formData?.domain || 'N/A',
        country: formData?.country || 'N/A'
      }
    };

    switch (reportType) {
      case 'trend-analysis':
        return {
          ...baseData,
          trends: trends || [],
          insights: generateTrendInsights(trends, formData),
          recommendations: generateRecommendations(trends)
        };
      case 'project-summary':
        return {
          ...baseData,
          projects: projects || [],
          technicalSummary: generateTechnicalSummary(projects),
          timelineAnalysis: generateTimelineAnalysis(projects)
        };
      case 'market-insights':
        return {
          ...baseData,
          marketData: generateMarketData(formData),
          competitiveAnalysis: generateCompetitiveAnalysis(formData),
          opportunities: generateOpportunities(trends, formData)
        };
      case 'performance-metrics':
        return {
          ...baseData,
          metrics: generatePerformanceMetrics(trends, projects),
          benchmarks: generateBenchmarks(),
          forecasts: generateForecasts(trends)
        };
      default:
        return baseData;
    }
  };

  const downloadReport = (data, reportType) => {
    const reportContent = generateReportContent(data, reportType);
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReportContent = (data, reportType) => {
    let content = `# ${reportTypes.find(r => r.id === reportType)?.name}\n\n`;
    content += `**Generated:** ${new Date(data.generatedAt).toLocaleDateString()}\n`;
    content += `**Date Range:** ${data.dateRange}\n`;
    content += `**Domain:** ${data.summary.domain}\n`;
    content += `**Country:** ${data.summary.country}\n\n`;

    content += `## Executive Summary\n\n`;
    content += `- Total Trends Analyzed: ${data.summary.totalTrends}\n`;
    content += `- Projects Generated: ${data.summary.totalProjects}\n`;
    content += `- Target Market: ${data.summary.country}\n`;
    content += `- Focus Domain: ${data.summary.domain}\n\n`;

    switch (reportType) {
      case 'trend-analysis':
        if (data.trends && data.trends.length > 0) {
          content += `## Trend Analysis\n\n`;
          data.trends.forEach((trend, index) => {
            content += `### ${index + 1}. ${trend.name}\n`;
            content += `- **Popularity Score:** ${trend.score}/100\n`;
            content += `- **Growth Rate:** ${trend.growth}\n\n`;
          });
        }
        break;
      case 'project-summary':
        if (data.projects && data.projects.length > 0) {
          content += `## Project Overview\n\n`;
          data.projects.forEach((project, index) => {
            content += `### ${index + 1}. ${project.title}\n`;
            content += `${project.description}\n\n`;
            content += `**Timeline:** ${project.timeline}\n`;
            content += `**Market Opportunity:** ${project.marketOpportunity}\n\n`;
          });
        }
        break;
    }

    return content;
  };

  // Mock data generators
  const generateTrendInsights = (trends, formData) => [
    'AI and automation trends show 45% growth in the last quarter',
    'Sustainability focus increasing across all demographics',
    'Remote work tools maintaining strong market presence'
  ];

  const generateRecommendations = (trends) => [
    'Focus on AI-powered solutions for maximum market impact',
    'Consider sustainability features in all new projects',
    'Prioritize mobile-first development approaches'
  ];

  const generateTechnicalSummary = (projects) => ({
    mostUsedTech: ['React', 'Node.js', 'Python', 'Cloud Services'],
    averageComplexity: 'Medium',
    estimatedCost: '$50K - $150K'
  });

  const generateTimelineAnalysis = (projects) => ({
    averageTimeline: '10 weeks',
    shortestProject: '6 weeks',
    longestProject: '16 weeks'
  });

  const generateMarketData = (formData) => ({
    marketSize: '$2.5B',
    growthRate: '23% CAGR',
    competitorCount: 15,
    marketMaturity: 'Growing'
  });

  const generateCompetitiveAnalysis = (formData) => [
    'Market leader: 35% market share',
    'Top 3 competitors control 60% of market',
    'Opportunity for niche specialization exists'
  ];

  const generateOpportunities = (trends, formData) => [
    'Underserved SMB market segment',
    'Integration opportunities with existing platforms',
    'International expansion potential'
  ];

  const generatePerformanceMetrics = (trends, projects) => ({
    trendAccuracy: '87%',
    projectViability: '92%',
    marketFit: '78%',
    userSatisfaction: '4.2/5'
  });

  const generateBenchmarks = () => ({
    industryAverage: '75%',
    topPerformer: '95%',
    ourPerformance: '87%'
  });

  const generateForecasts = (trends) => [
    { month: 'Jan', value: 85 },
    { month: 'Feb', value: 88 },
    { month: 'Mar', value: 92 },
    { month: 'Apr', value: 89 },
    { month: 'May', value: 94 },
    { month: 'Jun', value: 97 }
  ];

  const mockChartData = [
    { name: 'Week 1', trends: 12, projects: 3 },
    { name: 'Week 2', trends: 18, projects: 5 },
    { name: 'Week 3', trends: 25, projects: 8 },
    { name: 'Week 4', trends: 22, projects: 6 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FileText className="w-7 h-7 text-blue-600 mr-3" />
            Reports & Analytics
          </h2>
          <div className="flex space-x-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* Report Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedReport === report.id
                  ? `border-${report.color}-500 bg-${report.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <report.icon className={`w-6 h-6 text-${report.color}-600 mr-2`} />
                <h3 className="font-semibold text-gray-800">{report.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{report.description}</p>
            </div>
          ))}
        </div>

        {/* Report Preview */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {reportTypes.find(r => r.id === selectedReport)?.name} Preview
          </h3>
          
          {selectedReport === 'trend-analysis' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{trends?.length || 0}</div>
                  <div className="text-sm text-gray-600">Trends Analyzed</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">+23%</div>
                  <div className="text-sm text-gray-600">Growth Rate</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Trend Performance</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="trends" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedReport === 'project-summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{projects?.length || 0}</div>
                  <div className="text-sm text-gray-600">Projects Generated</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">10 weeks</div>
                  <div className="text-sm text-gray-600">Avg Timeline</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-gray-600">Viability Score</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Project Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="projects" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedReport === 'market-insights' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">$2.5B</div>
                  <div className="text-sm text-gray-600">Market Size</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">23%</div>
                  <div className="text-sm text-gray-600">CAGR</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">15</div>
                  <div className="text-sm text-gray-600">Competitors</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Market Opportunities</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Underserved SMB market segment</li>
                  <li>• Integration opportunities with existing platforms</li>
                  <li>• International expansion potential</li>
                  <li>• Emerging technology adoption</li>
                </ul>
              </div>
            </div>
          )}

          {selectedReport === 'performance-metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-sm text-gray-600">Trend Accuracy</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-gray-600">Project Viability</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">78%</div>
                  <div className="text-sm text-gray-600">Market Fit</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">4.2/5</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Performance Forecast</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={generateForecasts()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;