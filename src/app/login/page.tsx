'use client';

import { loginApi } from '@/lib/apis/auth';
import { LoginDto } from '@/lib/apis/auth/dto';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!email || !password) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const loginDto: LoginDto = {
        email,
        password,
      };
      const { accessToken, refreshToken } = await loginApi(loginDto);

      Cookies.set('token', accessToken, {
        secure: false,
        expires: 1,
        sameSite: 'Lax',
        path: '/',
      });
      Cookies.set('refreshToken', refreshToken, {
        secure: false,
        expires: 14,
        sameSite: 'Lax',
        path: '/',
      });

      // Next page -
      router.push('/create-url');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={!isValid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' here.'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
