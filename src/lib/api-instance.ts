export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

type CustomHeaders = HeadersInit & {
  Authorization?: string;
}
export async function refreshTokens(): Promise<boolean> {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`
      }
    });

    if (!response.ok) throw new Error('Refresh failed');

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return true;
  } catch (error) {
    console.log(error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return false;
  }
}

// Helper for making API requests
export const fetchWithAuth = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const accessToken = localStorage.getItem('access_token');

  const headers: CustomHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 by attempting token refresh
  if (response.status === 401) {
    const refreshed = await refreshTokens();
    if (!refreshed) {
      throw {
        message: 'Authentication expired',
        status: 401
      };
    }

    // Retry the original request with new token
    headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'An unknown error occurred',
    }));

    throw {
      message: errorData.message || `HTTP error! status: ${response.status}`,
      status: response.status
    };
  }

  return response.json() as Promise<T>;
};