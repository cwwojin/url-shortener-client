'use client';

import { signUpApi } from '@/lib/apis/users';
import { SignUpDto } from '@/lib/apis/users/dto';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { isPassword } from '@/lib/regex/check';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!email || !password) {
      setIsValid(false);
    } else if (!isPassword.test(password)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const signUpDto: SignUpDto = {
        email,
        password,
      };
      await signUpApi(signUpDto);

      router.push('/login');
    } catch {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">
          Register New Account
        </h2>
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="john-doe@gmail.com"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Length 8 ~ 16, contains upper & lowercase letters, digit, symbol."
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={!isValid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3">
            {'Already have an account? '}
            <Link href="/login" className="font-semibold text-gray-800">
              Login
            </Link>
            {' here.'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
