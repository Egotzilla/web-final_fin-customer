// API configuration utility
export const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

export const getApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  // Remove leading slash from endpoint if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
};

// For backward compatibility and convenience
export const API_BASE_URL = getApiBaseUrl();