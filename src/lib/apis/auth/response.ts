/** Login */
export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

/** Refresh token */
export interface RefreshResponse {
  data: {
    accessToken: string;
  };
}
