import { BaseService } from '../../../common/services/BaseService';
import { MockTrendRepository } from '../repositories/MockTrendRepository';
import { ValidationUtils } from '../../../common/utils/ValidationUtils';

/**
 * Trend Analysis Service
 * Business logic for trend analysis operations
 */
export class TrendAnalysisService extends BaseService {
  constructor() {
    super();
    this.trendRepository = new MockTrendRepository();
  }

  async analyzeTrends(formData) {
    // Validate input
    const validation = ValidationUtils.validateFormData(formData, {
      domain: { required: true },
      country: { required: true }
    });

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${Object.values(validation.errors).join(', ')}`);
    }

    try {
      // Fetch trends for the specified domain
      const trends = await this.trendRepository.findByDomain(formData.domain);
      
      // Apply filtering and scoring based on form data
      const filteredTrends = this.filterTrendsByContext(trends, formData);
      const scoredTrends = this.applyContextualScoring(filteredTrends, formData);
      
      return {
        trends: scoredTrends,
        metadata: {
          totalFound: trends.length,
          filtered: scoredTrends.length,
          domain: formData.domain,
          country: formData.country,
          analyzedAt: new Date()
        }
      };
    } catch (error) {
      console.error('Trend analysis failed:', error);
      throw new Error('Failed to analyze trends. Please try again.');
    }
  }

  filterTrendsByContext(trends, context) {
    return trends.filter(trend => {
      // Filter by age range if specified
      if (context.ageRange) {
        // Mock filtering logic - in real app, this would be more sophisticated
        const ageRangeScore = this.calculateAgeRangeRelevance(trend, context.ageRange);
        if (ageRangeScore < 0.5) return false;
      }

      // Filter by interests if specified
      if (context.interests) {
        const interests = context.interests.toLowerCase().split(',').map(i => i.trim());
        const hasMatchingInterest = interests.some(interest => 
          trend.keywords.some(keyword => keyword.includes(interest))
        );
        if (!hasMatchingInterest) return false;
      }

      return true;
    });
  }

  applyContextualScoring(trends, context) {
    return trends.map(trend => {
      let adjustedScore = trend.score;

      // Adjust score based on country relevance
      const countryMultiplier = this.getCountryRelevanceMultiplier(context.country);
      adjustedScore *= countryMultiplier;

      // Adjust score based on income level
      if (context.incomeLevel) {
        const incomeMultiplier = this.getIncomeRelevanceMultiplier(trend, context.incomeLevel);
        adjustedScore *= incomeMultiplier;
      }

      // Ensure score stays within bounds
      adjustedScore = Math.min(100, Math.max(0, Math.round(adjustedScore)));

      return {
        ...trend.toJSON(),
        score: adjustedScore,
        originalScore: trend.score,
        contextualFactors: {
          countryRelevance: countryMultiplier,
          incomeRelevance: context.incomeLevel ? this.getIncomeRelevanceMultiplier(trend, context.incomeLevel) : 1
        }
      };
    }).sort((a, b) => b.score - a.score); // Sort by adjusted score
  }

  calculateAgeRangeRelevance(trend, ageRange) {
    // Mock calculation - in real app, this would use demographic data
    const ageRangeRelevance = {
      '18-24': trend.name.includes('Social') || trend.name.includes('Gaming') ? 1.2 : 0.8,
      '25-34': trend.name.includes('AI') || trend.name.includes('Productivity') ? 1.2 : 0.9,
      '35-44': trend.name.includes('Business') || trend.name.includes('Finance') ? 1.2 : 0.9,
      '45-54': trend.name.includes('Health') || trend.name.includes('Investment') ? 1.2 : 0.8,
      '55+': trend.name.includes('Health') || trend.name.includes('Traditional') ? 1.2 : 0.7
    };

    return ageRangeRelevance[ageRange] || 1.0;
  }

  getCountryRelevanceMultiplier(country) {
    // Mock country relevance - in real app, this would use market data
    const countryMultipliers = {
      'United States': 1.1,
      'United Kingdom': 1.05,
      'Germany': 1.0,
      'France': 0.95,
      'Japan': 0.9,
      'China': 1.2,
      'India': 1.15
    };

    return countryMultipliers[country] || 1.0;
  }

  getIncomeRelevanceMultiplier(trend, incomeLevel) {
    // Mock income relevance calculation
    const luxuryKeywords = ['premium', 'luxury', 'high-end', 'exclusive'];
    const budgetKeywords = ['affordable', 'budget', 'free', 'low-cost'];
    
    const isLuxury = luxuryKeywords.some(keyword => 
      trend.name.toLowerCase().includes(keyword)
    );
    const isBudget = budgetKeywords.some(keyword => 
      trend.name.toLowerCase().includes(keyword)
    );

    switch (incomeLevel) {
      case 'luxury':
        return isLuxury ? 1.3 : isBudget ? 0.7 : 1.0;
      case 'high':
        return isLuxury ? 1.2 : isBudget ? 0.8 : 1.0;
      case 'middle':
        return isLuxury ? 0.9 : isBudget ? 1.1 : 1.0;
      case 'low':
        return isLuxury ? 0.6 : isBudget ? 1.3 : 1.0;
      default:
        return 1.0;
    }
  }

  async getTrendById(id) {
    return await this.trendRepository.findById(id);
  }

  async getAllTrends() {
    return await this.trendRepository.findAll();
  }
}