/**
 * Validation Utilities
 * Common validation functions used across modules
 */
export class ValidationUtils {
  static isRequired(value) {
    return value !== null && value !== undefined && value !== '';
  }

  static isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isInRange(value, min, max) {
    return value >= min && value <= max;
  }

  static validateFormData(data, rules) {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = data[field];
      
      if (rule.required && !this.isRequired(value)) {
        errors[field] = `${field} is required`;
      }
      
      if (rule.email && value && !this.isEmail(value)) {
        errors[field] = `${field} must be a valid email`;
      }
      
      if (rule.range && value && !this.isInRange(value, rule.range.min, rule.range.max)) {
        errors[field] = `${field} must be between ${rule.range.min} and ${rule.range.max}`;
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}