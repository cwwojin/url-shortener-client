'use client';

import Link from 'next/link';
import MainLayout from '@/components/page/layout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { GetMyUrlResponse } from '@/lib/apis/users/response';
import { getMyUrlApi } from '@/lib/apis/users';
import { HOSTING_URL } from '@/lib/apis/config';

const MyPage = () => {
  const router = useRouter();
  const [urls, setUrls] = useState([]);
  const [urlCount, setUrlCount] = useState(0);

  useEffect(() => {
    const accessToken = Cookies.get('token');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const [urlData, urlCount] = await getMyUrlApi();
        setUrls(urlData);
        setUrlCount(urlCount);
      } catch (error) {
        console.error('Failed to fetch URLs:', error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-gray-600 text-2xl font-bold mb-4">
          My Registered URLs
        </h1>
        {/* <p className="text-gray-600">This is the user profile page.</p> */}
        <div className="space-y-4">
          {urls.map((url: GetMyUrlResponse) => (
            <div key={url.pk} className="p-4 bg-white shadow rounded-md">
              <h2 className="text-blue-900 text-xl font-semibold">
                {`${url.pk}. `}
                <a
                  href={`${HOSTING_URL}/${url.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-lg font-bold hover:underline"
                >
                  {`${HOSTING_URL}/${url.shortUrl}`}
                </a>
              </h2>
              <p className="text-sm text-gray-600 mt-6">{`Original URL: ${url.originalUrl}`}</p>
              <div className="text-right">
                <Link
                  href={`/stats?url=${url.pk}&shorturl=${url.shortUrl}`}
                  className="text-sm text-blue-500"
                >
                  Click Here to View Statistics
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyPage;
