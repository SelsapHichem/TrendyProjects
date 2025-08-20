/**
 * Project Model
 * Data model for project entities
 */
export class ProjectModel {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.title = data.title || '';
    this.description = data.description || '';
    this.domain = data.domain || '';
    this.complexity = data.complexity || 'medium';
    this.timeline = data.timeline || '';
    this.techRequirements = data.techRequirements || [];
    this.successMetrics = data.successMetrics || [];
    this.marketOpportunity = data.marketOpportunity || '';
    this.targetAudience = data.targetAudience || '';
    this.countryConsiderations = data.countryConsiderations || [];
    this.alignedTrends = data.alignedTrends || [];
    this.estimatedCost = data.estimatedCost || '';
    this.riskFactors = data.riskFactors || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  generateId() {
    return `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Validation methods
  isValid() {
    return this.title && this.description && this.domain && this.timeline;
  }

  // Business logic methods
  isHighViability() {
    return this.alignedTrends.length >= 2 && this.successMetrics.length >= 3;
  }

  getComplexityLevel() {
    const levels = {
      'simple': 1,
      'medium': 2,
      'complex': 3
    };
    return levels[this.complexity] || 2;
  }

  getEstimatedDuration() {
    const durations = {
      'simple': 4, // weeks
      'medium': 8,
      'complex': 12
    };
    return durations[this.complexity] || 8;
  }

  // Serialization
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      domain: this.domain,
      complexity: this.complexity,
      timeline: this.timeline,
      techRequirements: this.techRequirements,
      successMetrics: this.successMetrics,
      marketOpportunity: this.marketOpportunity,
      targetAudience: this.targetAudience,
      countryConsiderations: this.countryConsiderations,
      alignedTrends: this.alignedTrends,
      estimatedCost: this.estimatedCost,
      riskFactors: this.riskFactors,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data) {
    return new ProjectModel(data);
  }
}