export interface LoginResponse {
  access_token: string,
  refresh_token: string
  token_type: string,
  user_id: number,
  email: string
}