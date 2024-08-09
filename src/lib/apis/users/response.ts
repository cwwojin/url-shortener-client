/** Sign up */
export interface SignUpResponse {
  data: {
    pk: number;
    id: string;
    email: string;
    username: string;
    password: string;
    refreshToken: string;
    profileImageKey: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
}

/** Get account info */
export interface GetMyAccountResponse {
  id: string;
  email: string;
  username: string;
  profileImageFile: string;
}

/** Get My URLs */
export interface GetMyUrlResponse {
  pk: number;
  shortUrl: string;
  originalUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
