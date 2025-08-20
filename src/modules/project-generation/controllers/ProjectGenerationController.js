import { ProjectGenerationService } from '../services/ProjectGenerationService';
import { eventBus } from '../../../common/services/EventBus';

/**
 * Project Generation Controller
 * Handles project generation operations and coordinates between views and services
 */
export class ProjectGenerationController {
  constructor() {
    this.projectGenerationService = new ProjectGenerationService();
    this.generatedProjects = [];
    this.isLoading = false;
  }

  async generateProjects(trends, formData) {
    try {
      this.setLoading(true);
      this.emitEvent('PROJECT_GENERATION_STARTED', { trends, formData });

      const result = await this.projectGenerationService.generateProjects(trends, formData);
      
      this.generatedProjects = result.projects;

      this.emitEvent('PROJECT_GENERATION_COMPLETED', {
        projects: this.generatedProjects,
        metadata: result.metadata
      });

      return result;

    } catch (error) {
      this.handleError(error, 'generateProjects');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async getProjectDetails(projectId) {
    try {
      this.setLoading(true);
      const project = await this.projectGenerationService.getProjectById(projectId);
      
      this.emitEvent('PROJECT_DETAILS_LOADED', { project });
      return project;

    } catch (error) {
      this.handleError(error, 'getProjectDetails');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  getGeneratedProjects() {
    return this.generatedProjects;
  }

  clearProjects() {
    this.generatedProjects = [];
    this.emitEvent('PROJECTS_CLEARED');
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
    console.error(`ProjectGenerationController.${context}:`, error);
    this.emitEvent('PROJECT_GENERATION_ERROR', { 
      error: error.message, 
      context 
    });
  }

  // Static factory method
  static getInstance() {
    if (!ProjectGenerationController.instance) {
      ProjectGenerationController.instance = new ProjectGenerationController();
    }
    return ProjectGenerationController.instance;
  }
}