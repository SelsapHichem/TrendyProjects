import React, { useState } from 'react';
import { Search, TrendingUp, Globe, Users, Calendar, Target } from 'lucide-react';
import { BaseComponent } from '../../../common/components/BaseComponent';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';
import { AppConfig } from '../../../common/configs/AppConfig';
import { ValidationUtils } from '../../../common/utils/ValidationUtils';
import { TrendAnalysisController } from '../controllers/TrendAnalysisController';

/**
 * Trend Analyzer View
 * UI component for trend analysis setup and configuration
 */
export class TrendAnalyzerView extends BaseComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      formData: {
        domain: '',
        country: '',
        ageRange: '',
        interests: '',
        incomeLevel: '',
        complexity: AppConfig.COMPLEXITY_LEVELS.MEDIUM
      },
      isLoading: false,
      errors: {},
      isSubmitted: false
    };

    this.controller = TrendAnalysisController.getInstance();
  }

  onMount() {
    // Subscribe to controller events
    this.subscribe('TREND_ANALYSIS_STARTED', this.handleAnalysisStarted.bind(this));
    this.subscribe('TREND_ANALYSIS_COMPLETED', this.handleAnalysisCompleted.bind(this));
    this.subscribe('TREND_ANALYSIS_ERROR', this.handleAnalysisError.bind(this));
    this.subscribe('LOADING_STATE_CHANGED', this.handleLoadingStateChanged.bind(this));
  }

  handleAnalysisStarted = (data) => {
    this.updateState({ isLoading: true, errors: {} });
  };

  handleAnalysisCompleted = (data) => {
    this.updateState({ isLoading: false, isSubmitted: true });
    if (this.props.onTrendAnalyzed) {
      this.props.onTrendAnalyzed(data.trends, data.formData);
    }
  };

  handleAnalysisError = (data) => {
    this.updateState({ 
      isLoading: false, 
      errors: { general: data.error }
    });
  };

  handleLoadingStateChanged = (data) => {
    this.updateState({ isLoading: data.isLoading });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.updateState({
      formData: {
        ...this.state.formData,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: null // Clear field error on change
      }
    });
  };

  validateForm = () => {
    const validation = ValidationUtils.validateFormData(this.state.formData, {
      domain: { required: true },
      country: { required: true }
    });

    this.updateState({ errors: validation.errors });
    return validation.isValid;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    try {
      await this.controller.analyzeTrends(this.state.formData);
    } catch (error) {
      // Error handling is done through event system
    }
  };

  render() {
    const { formData, isLoading, errors, isSubmitted } = this.state;

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Trend Analysis Setup</h2>
        </div>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 inline mr-1" />
                Domain/Industry *
              </label>
              <select
                name="domain"
                value={formData.domain}
                onChange={this.handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.domain ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a domain</option>
                {AppConfig.DOMAINS.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
              {errors.domain && (
                <p className="mt-1 text-sm text-red-600">{errors.domain}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Target Country *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={this.handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.country ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a country</option>
                {AppConfig.COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Age Range
              </label>
              <select
                name="ageRange"
                value={formData.ageRange}
                onChange={this.handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any age</option>
                <option value="18-24">18-24 (Gen Z)</option>
                <option value="25-34">25-34 (Millennials)</option>
                <option value="35-44">35-44 (Gen X)</option>
                <option value="45-54">45-54 (Gen X)</option>
                <option value="55+">55+ (Boomers)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Income Level
              </label>
              <select
                name="incomeLevel"
                value={formData.incomeLevel}
                onChange={this.handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any income level</option>
                <option value="low">Low Income</option>
                <option value="middle">Middle Income</option>
                <option value="high">High Income</option>
                <option value="luxury">Luxury Market</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Project Complexity
              </label>
              <select
                name="complexity"
                value={formData.complexity}
                onChange={this.handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={AppConfig.COMPLEXITY_LEVELS.SIMPLE}>Simple (1 month)</option>
                <option value={AppConfig.COMPLEXITY_LEVELS.MEDIUM}>Medium (2 months)</option>
                <option value={AppConfig.COMPLEXITY_LEVELS.COMPLEX}>Complex (3 months)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests/Keywords
              </label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={this.handleInputChange}
                placeholder="e.g., mobile apps, sustainability, social media"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.domain || !formData.country}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <LoadingSpinner size="small" text="Analyzing Trends..." />
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Current Trends
              </>
            )}
          </button>
        </form>
      </div>
    );
  }
}