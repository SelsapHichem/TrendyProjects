/**
 * Trend Model
 * Data model for trend entities
 */
export class TrendModel {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.name = data.name || '';
    this.domain = data.domain || '';
    this.score = data.score || 0;
    this.growth = data.growth || '0%';
    this.geographicRelevance = data.geographicRelevance || '';
    this.keywords = data.keywords || [];
    this.sourceUrls = data.sourceUrls || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  generateId() {
    return `trend_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Validation methods
  isValid() {
    return this.name && this.domain && this.score >= 0 && this.score <= 100;
  }

  // Business logic methods
  isHighPerforming() {
    return this.score >= 80;
  }

  isGrowing() {
    return this.growth.includes('+');
  }

  getGrowthRate() {
    return parseFloat(this.growth.replace('%', '').replace('+', ''));
  }

  // Serialization
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      domain: this.domain,
      score: this.score,
      growth: this.growth,
      geographicRelevance: this.geographicRelevance,
      keywords: this.keywords,
      sourceUrls: this.sourceUrls,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data) {
    return new TrendModel(data);
  }
}