'use client';

import MainLayout from '@/components/page/layout';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AccountSettings = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('token');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  return (
    <MainLayout>
      <h1 className="text-gray-600 text-2xl font-bold mb-4">
        Account Settings
      </h1>
      <p className="text-gray-600">
        Here you can update your account settings.
      </p>
    </MainLayout>
  );
};

export default AccountSettings;
