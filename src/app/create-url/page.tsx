'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { generateShortUrlApi } from '@/lib/apis/url';
import { CreateUrlDto } from '@/lib/apis/url/dto';
import { HOSTING_URL } from '@/lib/apis/config';
import MainLayout from '@/components/page/layout';

const UrlGeneration = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('token');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const data: CreateUrlDto = { originalUrl: url };
      const { shortUrl } = await generateShortUrlApi(data);

      setShortUrl(shortUrl);
    } catch (error) {
      console.error('Error generating short URL:', error);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen-md flex items-center justify-center bg-gray-100">
        <div className="max-w-screen-md w-full bg-white p-8 rounded shadow-md">
          <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">
            Generate A Short URL
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="url"
              >
                URL
              </label>
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter URL"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Shorten
              </button>
            </div>
          </form>
          {shortUrl && (
            <div className="mt-4">
              <p className="text-blue-500">
                Your Short URL is :{' '}
                <a
                  href={`${HOSTING_URL}/${shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-bold hover:underline"
                >
                  {`${HOSTING_URL}/${shortUrl}`}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default UrlGeneration;
