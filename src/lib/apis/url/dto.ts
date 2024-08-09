/** Generate short URL */
export interface CreateUrlDto {
  originalUrl: string;
}

/** Get original URL */
export interface GetOriginalUrlDto {
  shortUrl: string;
}

/** Delete short URL */
export interface DeleteShortUrlDto {
  shortUrl: string;
}

/** Get URL metadata */
export interface GetUrlMetaDto {
  urlId: number;
}

/** Get all click history of a URL */
export interface GetUrlHistoryDto {
  urlId: number;
}
