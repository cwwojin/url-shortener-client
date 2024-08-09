import axios from 'axios';
// import axios from '@/lib/utils/axiosInstance';
import { HOSTING_URL, getHeaders } from '../config';
import {
  SignUpDto,
  UpdatePasswordDto,
  SignOutDto,
  UpdateProfileImageDto,
} from './dto';

/** Sign up */
export const signUpApi = async (data: SignUpDto) => {
  const { ...signUpDto } = data;
  const url = `${HOSTING_URL}/users/signup`;
  return axios({
    method: 'post',
    url,
    headers: getHeaders(),
    data: signUpDto,
  });
};

/** Get account info */
export const getMyAccountApi = async () => {
  const url = `${HOSTING_URL}/users/myAccount`;
  const { data: axiosData } = await axios({
    method: 'get',
    url,
    headers: getHeaders(),
  });
  return axiosData;
};

/** Update password */
export const updatePasswordApi = async (data: UpdatePasswordDto) => {
  const { ...updatePasswordDto } = data;
  const url = `${HOSTING_URL}/users/password`;
  return axios({
    method: 'patch',
    url,
    headers: getHeaders(),
    data: updatePasswordDto,
  });
};

/** Sign out */
export const signOutApi = async (data: SignOutDto) => {
  const { ...signOutDto } = data;
  const url = `${HOSTING_URL}/users/signout`;
  return axios({
    method: 'delete',
    url,
    headers: getHeaders(),
    data: signOutDto,
  });
};

/** Get My URLs */
export const getMyUrlApi = async () => {
  const url = `${HOSTING_URL}/users/url`;
  const { data: axiosData } = await axios({
    method: 'get',
    url,
    headers: getHeaders(),
  });
  return axiosData;
};

/** Upload profile image */
export const updateProfileImageApi = async (data: UpdateProfileImageDto) => {
  const { file } = data;
  const formData = new FormData();
  formData.append('file', file);
  const url = `${HOSTING_URL}/users/profile-img`;
  return axios({
    method: 'post',
    url,
    headers: { ...getHeaders(), 'Content-Type': 'multipart/form-data' },
    data: formData,
  });
};

/** Delete profile image */
export const deleteProfileImageApi = async () => {
  const url = `${HOSTING_URL}/users/profile-img`;
  return axios({
    method: 'delete',
    url,
    headers: getHeaders(),
  });
};
