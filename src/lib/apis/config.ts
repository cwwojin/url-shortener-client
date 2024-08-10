import Cookies from 'js-cookie';

// const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
// export const HOSTING_URL = isProduction
//   ? 'http://url-shortener-alb-732016051.ap-northeast-2.elb.amazonaws.com'
//   : 'http://localhost:3000';

// export const HOSTING_URL =
//   'http://url-shortener-alb-732016051.ap-northeast-2.elb.amazonaws.com';

export const HOSTING_URL = '/api';

export const getHeaders = () => {
  const accessToken = Cookies.get('token');
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: accessToken ? accessToken : '',
  };
};

export const getRefreshHeaders = () => {
  const refreshToken = Cookies.get('refreshToken');
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: refreshToken ? refreshToken : '',
  };
};
