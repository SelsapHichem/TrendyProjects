import { TrendAnalysisService } from '../services/TrendAnalysisService';
import { eventBus } from '../../../common/services/EventBus';

/**
 * Trend Analysis Controller
 * Handles trend analysis operations and coordinates between views and services
 */
export class TrendAnalysisController {
  constructor() {
    this.trendAnalysisService = new TrendAnalysisService();
    this.currentAnalysis = null;
    this.isLoading = false;
  }

  async analyzeTrends(formData) {
    try {
      this.setLoading(true);
      this.emitEvent('TREND_ANALYSIS_STARTED', { formData });

      const result = await this.trendAnalysisService.analyzeTrends(formData);
      
      this.currentAnalysis = {
        ...result,
        formData
      };

      this.emitEvent('TREND_ANALYSIS_COMPLETED', this.currentAnalysis);
      return this.currentAnalysis;

    } catch (error) {
      this.handleError(error, 'analyzeTrends');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async getTrendDetails(trendId) {
    try {
      this.setLoading(true);
      const trend = await this.trendAnalysisService.getTrendById(trendId);
      
      if (!trend) {
        throw new Error('Trend not found');
      }

      this.emitEvent('TREND_DETAILS_LOADED', { trend });
      return trend;

    } catch (error) {
      this.handleError(error, 'getTrendDetails');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  getCurrentAnalysis() {
    return this.currentAnalysis;
  }

  clearAnalysis() {
    this.currentAnalysis = null;
    this.emitEvent('TREND_ANALYSIS_CLEARED');
  }

  // Helper methods
  setLoading(loading) {
    this.isLoading = loading;
    this.emitEvent('LOADING_STATE_CHANGED', { isLoading: loading });
  }

  emitEvent(eventName, data) {
    eventBus.emit(eventName, data);
  }

  handleError(error, context) {
    console.error(`TrendAnalysisController.${context}:`, error);
    this.emitEvent('TREND_ANALYSIS_ERROR', { 
      error: error.message, 
      context 
    });
  }

  // Static factory method
  static getInstance() {
    if (!TrendAnalysisController.instance) {
      TrendAnalysisController.instance = new TrendAnalysisController();
    }
    return TrendAnalysisController.instance;
  }
}