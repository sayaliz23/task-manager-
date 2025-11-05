// Base URL for all API calls
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  
  // Task endpoints
  TASKS: `${API_BASE_URL}/api/tasks`,
  TASK: (id: string) => `${API_BASE_URL}/api/tasks/${id}`,
};