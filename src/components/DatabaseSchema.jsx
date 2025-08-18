import React, { useState } from 'react';
import { Database, Table, Key, Link, Code, Download } from 'lucide-react';

const DatabaseSchema = ({ trends, formData, projects }) => {
  const [activeTab, setActiveTab] = useState('schema');

  const generateSQLSchema = () => {
    return `-- Current Trend Project Specs Generator Database Schema
-- Generated on ${new Date().toISOString().split('T')[0]}

-- Central Trends Table
CREATE TABLE trends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    popularity_score INTEGER CHECK (popularity_score >= 0 AND popularity_score <= 100),
    growth_rate DECIMAL(5,2),
    geographic_relevance VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    source_urls TEXT[],
    keywords TEXT[],
    INDEX idx_trends_domain (domain),
    INDEX idx_trends_popularity (popularity_score DESC),
    INDEX idx_trends_geographic (geographic_relevance)
);

-- Audience Demographics Table
CREATE TABLE audiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    age_range VARCHAR(20),
    interests TEXT[],
    income_level VARCHAR(20),
    geographic_location VARCHAR(100),
    behavioral_traits JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    INDEX idx_audiences_age (age_range),
    INDEX idx_audiences_location (geographic_location)
);

-- Countries Context Table
CREATE TABLE country_contexts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code VARCHAR(3) NOT NULL,
    country_name VARCHAR(100) NOT NULL,
    market_conditions JSONB,
    regulations JSONB,
    cultural_factors JSONB,
    economic_indicators JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(country_code),
    INDEX idx_country_name (country_name)
);

-- Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    domain VARCHAR(100),
    complexity_level VARCHAR(20) CHECK (complexity_level IN ('simple', 'medium', 'complex')),
    estimated_timeline VARCHAR(50),
    technical_requirements JSONB,
    success_metrics JSONB,
    market_opportunity TEXT,
    target_audience_id UUID REFERENCES audiences(id),
    country_context_id UUID REFERENCES country_contexts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    INDEX idx_projects_domain (domain),
    INDEX idx_projects_complexity (complexity_level)
);

-- Project-Trend Relationships (Many-to-Many)
CREATE TABLE project_trends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
    alignment_score INTEGER CHECK (alignment_score >= 0 AND alignment_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(project_id, trend_id)
);

-- Analysis Sessions Table
CREATE TABLE analysis_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_data JSONB,
    form_inputs JSONB,
    generated_trends JSONB,
    generated_projects JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    INDEX idx_sessions_created (created_at DESC)
);

-- Trend Sources Table
CREATE TABLE trend_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
    source_name VARCHAR(255),
    source_url TEXT,
    reliability_score INTEGER CHECK (reliability_score >= 0 AND reliability_score <= 100),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    INDEX idx_sources_trend (trend_id)
);

-- Performance Metrics Table
CREATE TABLE project_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    metric_name VARCHAR(100),
    metric_value DECIMAL(10,2),
    measurement_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    notes TEXT,
    INDEX idx_performance_project (project_id),
    INDEX idx_performance_date (measurement_date DESC)
);`;
  };

  const schemaEntities = [
    {
      name: 'trends',
      description: 'Central entity storing identified trends',
      fields: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'domain', type: 'VARCHAR(100)', isRequired: true },
        { name: 'name', type: 'VARCHAR(255)', isRequired: true },
        { name: 'popularity_score', type: 'INTEGER', constraint: '0-100' },
        { name: 'growth_rate', type: 'DECIMAL(5,2)' },
        { name: 'geographic_relevance', type: 'VARCHAR(100)' },
        { name: 'source_urls', type: 'TEXT[]' }
      ]
    },
    {
      name: 'audiences',
      description: 'Target audience demographics and characteristics',
      fields: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'age_range', type: 'VARCHAR(20)' },
        { name: 'interests', type: 'TEXT[]' },
        { name: 'income_level', type: 'VARCHAR(20)' },
        { name: 'geographic_location', type: 'VARCHAR(100)' },
        { name: 'behavioral_traits', type: 'JSONB' }
      ]
    },
    {
      name: 'projects',
      description: 'Generated project specifications',
      fields: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'title', type: 'VARCHAR(255)', isRequired: true },
        { name: 'description', type: 'TEXT' },
        { name: 'complexity_level', type: 'VARCHAR(20)' },
        { name: 'technical_requirements', type: 'JSONB' },
        { name: 'success_metrics', type: 'JSONB' },
        { name: 'target_audience_id', type: 'UUID', isForeign: true }
      ]
    },
    {
      name: 'country_contexts',
      description: 'Country-specific market and regulatory information',
      fields: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'country_name', type: 'VARCHAR(100)', isRequired: true },
        { name: 'market_conditions', type: 'JSONB' },
        { name: 'regulations', type: 'JSONB' },
        { name: 'cultural_factors', type: 'JSONB' }
      ]
    }
  ];

  const downloadSchema = () => {
    const sqlContent = generateSQLSchema();
    const blob = new Blob([sqlContent], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trend_project_schema.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <Database className="w-6 h-6 text-green-600 mr-2" />
          Database Schema Design
        </h3>
        <button
          onClick={downloadSchema}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download SQL
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === 'schema'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Schema Overview
          </button>
          <button
            onClick={() => setActiveTab('relationships')}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === 'relationships'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Relationships
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === 'sql'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            SQL Code
          </button>
        </div>
      </div>

      {activeTab === 'schema' && (
        <div className="space-y-6">
          {schemaEntities.map((entity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Table className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="text-lg font-medium text-gray-800">{entity.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">{entity.description}</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {entity.fields.map((field, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 text-sm text-gray-900 flex items-center">
                          {field.isPrimary && <Key className="w-3 h-3 text-yellow-500 mr-1" />}
                          {field.isForeign && <Link className="w-3 h-3 text-blue-500 mr-1" />}
                          {field.name}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-600">{field.type}</td>
                        <td className="px-3 py-2 text-sm text-gray-500">
                          {field.isPrimary && <span className="text-yellow-600">PRIMARY KEY</span>}
                          {field.isRequired && <span className="text-red-600">NOT NULL</span>}
                          {field.isForeign && <span className="text-blue-600">FOREIGN KEY</span>}
                          {field.constraint && <span className="text-purple-600">{field.constraint}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'relationships' && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Entity Relationships</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                <span><strong>projects</strong> ↔ <strong>audiences</strong> (Many-to-One)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span><strong>projects</strong> ↔ <strong>country_contexts</strong> (Many-to-One)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                <span><strong>projects</strong> ↔ <strong>trends</strong> (Many-to-Many via project_trends)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                <span><strong>trends</strong> ↔ <strong>trend_sources</strong> (One-to-Many)</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Key Indexes</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <code>idx_trends_domain</code> - Fast domain-based trend queries</li>
              <li>• <code>idx_trends_popularity</code> - Popularity-based sorting</li>
              <li>• <code>idx_projects_complexity</code> - Filter by project complexity</li>
              <li>• <code>idx_sessions_created</code> - Recent analysis sessions</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'sql' && (
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Code className="w-4 h-4 mr-2" />
            Complete SQL Schema Definition
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-xs">
              <code>{generateSQLSchema()}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseSchema;