/**
 * Application Configuration
 * Centralized configuration management
 */
export class AppConfig {
  static API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
  static APP_NAME = 'Current Trend Project Specs Generator';
  static VERSION = '1.0.0';
  
  static DOMAINS = [
    'Technology', 'Fashion', 'Health & Wellness', 'Finance', 'Education',
    'Entertainment', 'Food & Beverage', 'Travel', 'Automotive', 'Real Estate',
    'E-commerce', 'Gaming', 'Sustainability', 'AI & Machine Learning', 'Blockchain'
  ];

  static COUNTRIES = [
    'United States', 'United Kingdom', 'Germany', 'France', 'Japan',
    'China', 'India', 'Brazil', 'Australia', 'Canada', 'South Korea',
    'Netherlands', 'Singapore', 'Sweden', 'Switzerland'
  ];

  static COMPLEXITY_LEVELS = {
    SIMPLE: 'simple',
    MEDIUM: 'medium',
    COMPLEX: 'complex'
  };

  static CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
}