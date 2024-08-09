/** Generate short URL */
export interface GenerateShortUrlResponse {
  data: {
    pk: number;
    originalUrl: string;
    shortUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

/** Get original URL */
export interface GetOriginalUrlResponse {
  data: {
    pk: number;
    originalUrl: string;
    shortUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

/** Get URL metadata */
export interface GetUrlMetaResponse {
  data: {
    pk: number;
    lastClickedTime: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

/** Get URL click history */
export interface GetUrlHistoryResponse {
  data: {
    pk: number;
    clickedTime: Date;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
