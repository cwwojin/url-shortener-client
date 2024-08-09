import axios from 'axios';
// import axios from '@/lib/utils/axiosInstance';
import { HOSTING_URL, getHeaders } from '../config';
import {
  CreateUrlDto,
  DeleteShortUrlDto,
  GetOriginalUrlDto,
  GetUrlHistoryDto,
  GetUrlMetaDto,
} from './dto';

/** Generate short URL */
export const generateShortUrlApi = async (data: CreateUrlDto) => {
  const { ...createUrlDto } = data;
  const url = `${HOSTING_URL}/url/new`;
  const { data: axiosData } = await axios({
    method: 'post',
    url,
    headers: getHeaders(),
    data: createUrlDto,
  });
  return axiosData;
};

/** Get original URL */
export const getOriginalUrlApi = async (data: GetOriginalUrlDto) => {
  const { shortUrl } = data;
  const url = `${HOSTING_URL}/url/get/${shortUrl}`;
  const { data: axiosData } = await axios({
    method: 'get',
    url,
    headers: getHeaders(),
  });
  return axiosData;
};

/** Delete short URL */
export const deleteShortUrlApi = async (data: DeleteShortUrlDto) => {
  const { shortUrl } = data;
  const url = `${HOSTING_URL}/url/${shortUrl}`;
  return axios({
    method: 'delete',
    url,
    headers: getHeaders(),
  });
};

/** Get URL metadata */
export const getUrlMetaApi = async (data: GetUrlMetaDto) => {
  const { urlId } = data;
  const url = `${HOSTING_URL}/url/inspect/${urlId}`;
  const { data: axiosData } = await axios({
    method: 'get',
    url,
    headers: getHeaders(),
  });
  return axiosData;
};

/** Get URL click history */
export const getUrlHistoryApi = async (data: GetUrlHistoryDto) => {
  const { urlId } = data;
  const url = `${HOSTING_URL}/url/history/${urlId}`;
  const { data: axiosData } = await axios({
    method: 'get',
    url,
    headers: getHeaders(),
  });
  return axiosData;
};
