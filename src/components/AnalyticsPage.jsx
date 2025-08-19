import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Globe, Calendar, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage = ({ trends, formData, projects }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('popularity');

  // Generate analytics data
  const analyticsData = generateAnalyticsData(trends, formData, projects);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BarChart3 className="w-7 h-7 text-blue-600 mr-3" />
            Analytics Dashboard
          </h2>
          <div className="flex space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="growth">Growth Rate</option>
              <option value="engagement">Engagement</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Trends</p>
                <p className="text-2xl font-bold">{analyticsData.totalTrends}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-200" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>+12% from last period</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Avg Popularity</p>
                <p className="text-2xl font-bold">{analyticsData.avgPopularity}</p>
              </div>
              <Target className="w-8 h-8 text-green-200" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>+8% from last period</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Projects Generated</p>
                <p className="text-2xl font-bold">{analyticsData.totalProjects}</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>+25% from last period</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Success Rate</p>
                <p className="text-2xl font-bold">{analyticsData.successRate}%</p>
              </div>
              <Globe className="w-8 h-8 text-orange-200" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowDown className="w-4 h-4 mr-1" />
              <span>-2% from last period</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Performance Over Time */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Trend Performance Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analyticsData.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="popularity" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="growth" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Domain Distribution */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Domain Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.domainData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Geographic Performance */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Geographic Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData.geoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Trend Categories */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Categories</h3>
            <div className="space-y-3">
              {analyticsData.topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{category.score}</div>
                    <div className="text-sm text-gray-500">{category.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Trend Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popularity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.detailedTrends.map((trend, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trend.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trend.domain}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${trend.popularity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{trend.popularity}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      trend.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trend.growth > 0 ? '+' : ''}{trend.growth}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      trend.status === 'Rising' ? 'bg-green-100 text-green-800' : 
                      trend.status === 'Stable' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trend.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate mock analytics data
const generateAnalyticsData = (trends, formData, projects) => {
  const mockTimeSeriesData = [
    { date: '2024-01-01', popularity: 65, growth: 12 },
    { date: '2024-01-08', popularity: 72, growth: 18 },
    { date: '2024-01-15', popularity: 78, growth: 25 },
    { date: '2024-01-22', popularity: 85, growth: 32 },
    { date: '2024-01-29', popularity: 82, growth: 28 }
  ];

  const mockDomainData = [
    { name: 'Technology', value: 35 },
    { name: 'Health', value: 25 },
    { name: 'Finance', value: 20 },
    { name: 'Education', value: 12 },
    { name: 'Other', value: 8 }
  ];

  const mockGeoData = [
    { country: 'US', score: 92 },
    { country: 'UK', score: 87 },
    { country: 'DE', score: 83 },
    { country: 'FR', score: 79 },
    { country: 'JP', score: 75 }
  ];

  const mockTopCategories = [
    { name: 'AI & Machine Learning', score: 94, change: '+12%' },
    { name: 'Sustainability', score: 89, change: '+8%' },
    { name: 'Remote Work Tools', score: 85, change: '+15%' },
    { name: 'Health Tech', score: 82, change: '+6%' },
    { name: 'Fintech', score: 78, change: '+3%' }
  ];

  const mockDetailedTrends = trends?.map(trend => ({
    name: trend.name,
    domain: formData?.domain || 'Technology',
    popularity: trend.score,
    growth: parseInt(trend.growth?.replace('%', '').replace('+', '') || '0'),
    status: trend.score > 85 ? 'Rising' : trend.score > 70 ? 'Stable' : 'Declining'
  })) || [];

  return {
    totalTrends: trends?.length || 0,
    avgPopularity: trends?.reduce((acc, trend) => acc + trend.score, 0) / (trends?.length || 1) || 0,
    totalProjects: projects?.length || 0,
    successRate: 87,
    timeSeriesData: mockTimeSeriesData,
    domainData: mockDomainData,
    geoData: mockGeoData,
    topCategories: mockTopCategories,
    detailedTrends: mockDetailedTrends
  };
};

export default AnalyticsPage;