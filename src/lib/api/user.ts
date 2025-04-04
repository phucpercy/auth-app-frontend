import {LoginResponse} from "@/types/Users";
import {API_URL, fetchWithAuth} from "@/lib/api-instance";

const saveLoginInfo = (response: LoginResponse) => {
  localStorage.setItem("access_token", response.access_token)
  localStorage.setItem("refresh_token", response.refresh_token)
  localStorage.setItem("user", JSON.stringify({email: response.email, userId: response.user_id}))
}
export const register = async (email: string, password: string): Promise<LoginResponse> => {
  return fetchWithAuth<LoginResponse>('/users/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }).then(response => {
    saveLoginInfo(response);
    return response;
  });
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return fetchWithAuth<LoginResponse>('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }).then(response => {
    saveLoginInfo(response);
    return response;
  });
};

export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refresh_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`
  };

  await fetch(`${API_URL}/users/logout`, {
    method: 'POST',
    headers: headers
  }).then(response => {
    console.log(response);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  })
}