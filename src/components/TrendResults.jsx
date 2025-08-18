import React from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Globe, Calendar, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TrendResults = ({ trends, formData }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const chartData = trends.map(trend => ({
    name: trend.name.split(' ').slice(0, 2).join(' '),
    score: trend.score,
    growth: parseInt(trend.growth.replace('%', '').replace('+', ''))
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
            Current Trends Analysis
          </h3>
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Last 30 days
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Trend Popularity Scores</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Growth Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="growth"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Context</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <Globe className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Target Market</p>
              <p className="text-lg font-semibold text-blue-800">{formData.country}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <Users className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600 font-medium">Audience</p>
              <p className="text-lg font-semibold text-green-800">
                {formData.ageRange || 'All Ages'}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Domain</p>
              <p className="text-lg font-semibold text-purple-800">{formData.domain}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Identified Trends</h3>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-md font-medium text-gray-800 mb-2">{trend.name}</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Popularity Score:</span>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                        {trend.score}/100
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Growth:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-sm font-medium flex items-center ${
                        trend.growth.includes('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {trend.growth.includes('+') ? (
                          <ArrowUp className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDown className="w-3 h-3 mr-1" />
                        )}
                        {trend.growth}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendResults;