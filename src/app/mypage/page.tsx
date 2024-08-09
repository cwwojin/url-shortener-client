'use client';

import React from 'react';
import MainLayout from '@/components/page/layout';
import { useRouter } from 'next/navigation';

const MyPage = () => {
  const router = useRouter();
  return (
    <MainLayout>
      <h1 className="text-gray-600 text-2xl font-bold mb-4">My Page</h1>
      <p className="text-gray-600">This is the user profile page.</p>
    </MainLayout>
  );
};

export default MyPage;
