import { AppConfig } from '../../../common/configs/AppConfig';
import { TrendModel } from '../models/TrendModel';

/**
 * Mock Trend Repository
 * Data source implementation for mock trend data
 */
export class MockTrendRepository {
  constructor() {
    this.mockData = this.generateMockTrends();
  }

  generateMockTrends() {
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

    const allTrends = {};
    Object.keys(trendTemplates).forEach(domain => {
      allTrends[domain] = trendTemplates[domain].map(trend => 
        new TrendModel({
          ...trend,
          domain,
          geographicRelevance: 'Global',
          keywords: trend.name.toLowerCase().split(' '),
          sourceUrls: [`https://example.com/trends/${trend.name.toLowerCase().replace(/\s+/g, '-')}`]
        })
      );
    });

    return allTrends;
  }

  async findByDomain(domain) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.mockData[domain] || [];
  }

  async findAll() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Object.values(this.mockData).flat();
  }

  async findById(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const allTrends = Object.values(this.mockData).flat();
    return allTrends.find(trend => trend.id === id);
  }

  async create(trendData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const trend = new TrendModel(trendData);
    
    if (!this.mockData[trend.domain]) {
      this.mockData[trend.domain] = [];
    }
    
    this.mockData[trend.domain].push(trend);
    return trend;
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const allTrends = Object.values(this.mockData).flat();
    const trend = allTrends.find(t => t.id === id);
    
    if (trend) {
      Object.assign(trend, updates, { updatedAt: new Date() });
      return trend;
    }
    
    throw new Error(`Trend with id ${id} not found`);
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    Object.keys(this.mockData).forEach(domain => {
      this.mockData[domain] = this.mockData[domain].filter(trend => trend.id !== id);
    });
    return true;
  }
}