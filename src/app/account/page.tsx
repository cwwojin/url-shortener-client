'use client';

import React from 'react';
import MainLayout from '@/components/page/layout';

const AccountSettings = () => {
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
