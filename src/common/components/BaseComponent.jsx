import React, { Component } from 'react';
import { eventBus } from '../services/EventBus';

/**
 * Base Component Class
 * Abstract base class for all components with common functionality
 */
export class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.eventSubscriptions = [];
  }

  componentDidMount() {
    this.onMount();
  }

  componentWillUnmount() {
    // Clean up event subscriptions
    this.eventSubscriptions.forEach(unsubscribe => unsubscribe());
    this.onUnmount();
  }

  // Template methods for subclasses to override
  onMount() {}
  onUnmount() {}

  // Event bus helpers
  subscribe(event, callback) {
    const unsubscribe = eventBus.subscribe(event, callback);
    this.eventSubscriptions.push(unsubscribe);
    return unsubscribe;
  }

  emit(event, data) {
    eventBus.emit(event, data);
  }

  // Common state update with validation
  updateState(updates, callback) {
    this.setState(updates, callback);
  }

  // Loading state management
  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  // Error handling
  handleError(error, context = '') {
    console.error(`Error in ${this.constructor.name}${context ? ` - ${context}` : ''}:`, error);
    this.setState({ 
      error: error.message || 'An unexpected error occurred',
      isLoading: false 
    });
  }
}