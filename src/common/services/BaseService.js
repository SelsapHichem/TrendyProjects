/**
 * Base Service Class
 * Abstract base class for all services with common functionality
 */
export class BaseService {
  constructor() {
    if (this.constructor === BaseService) {
      throw new Error('BaseService is abstract and cannot be instantiated');
    }
  }

  /**
   * Handle API responses with error handling
   */
  async handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  /**
   * Generic API call method
   */
  async apiCall(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  /**
   * Simulate async operation with delay
   */
  async simulateAsync(data, delay = 1000) {
    return new Promise(resolve => {
      setTimeout(() => resolve(data), delay);
    });
  }
}