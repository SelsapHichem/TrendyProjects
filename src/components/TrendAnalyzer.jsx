import React from 'react';
import { TrendAnalyzerView } from '../modules/trend-analysis/views/TrendAnalyzerView';

/**
 * Legacy wrapper component for TrendAnalyzerView
 * Maintains backward compatibility while using new modular architecture
 */
const TrendAnalyzer = ({ onTrendAnalyzed }) => {
  return <TrendAnalyzerView onTrendAnalyzed={onTrendAnalyzed} />;
};

export default TrendAnalyzer;