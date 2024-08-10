'use client';

import MainLayout from '@/components/page/layout';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  updatePasswordApi,
  updateProfileImageApi,
  getMyAccountApi,
} from '@/lib/apis/users';
import { UpdatePasswordDto } from '@/lib/apis/users/dto';
import LocalStorage from '@/lib/utils/localStorage';
import { ChangeEvent } from 'react';

const AccountSettings = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('token');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const imageUrl = localStorage.getItem('profileImage');

      if (!imageUrl) {
        try {
          const { profileImageFile: imageUrl } = await getMyAccountApi();

          localStorage.setItem('profileImage', imageUrl);
        } catch (error) {
          console.error('Failed to fetch profile image:', error);
        }
      }
      setProfileImage(imageUrl ? imageUrl : '/assets/default-avatar.jpg');
    };

    fetchProfileImage();
  }, []);

  /* ====================================================== */
  /* START Event Handlers                                   */
  /* ====================================================== */

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setShowPopup(true);
    }
  };

  const handleProfileImageUpload = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);

      try {
        const { data: uploadedFile } = await updateProfileImageApi({
          file: selectedFile,
        });
        setProfileImage(uploadedFile);
        LocalStorage.setItem('profileImage', uploadedFile);
        setShowPopup(false);
      } catch (error) {
        console.error('Failed to upload profile image:', error);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    localStorage.removeItem('profileItem');
    router.push('/login');
  };

  const handlePasswordUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const data: UpdatePasswordDto = {
        password: currentPassword,
        newPassword: newPassword,
      };
      await updatePasswordApi(data);
      setCurrentPassword('');
      setNewPassword('');
      alert('Password updated successfully');

      handleLogout();
    } catch (error) {
      setError(`Failed to update password : ${error}`);
    }
  };

  /* ====================================================== */
  /* END Event Handlers                                     */
  /* ====================================================== */

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-image-upload" className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden cursor-pointer group-hover:opacity-65 transition duration-200 ease-in-out">
                <Image
                  src={
                    profileImage ||
                    LocalStorage.getItem('profileImage') ||
                    '/assets/default-avatar.png'
                  }
                  alt="Profile"
                  width={96}
                  height={96}
                  objectFit="cover"
                />
              </div>
            </label>
            <h2 className="text-xl text-blue-700 font-bold mt-4 mb-2">
              Update Password
            </h2>
            <form onSubmit={handlePasswordUpdate} className="w-full">
              <input
                type="password"
                placeholder="Current Password"
                className="text-gray-700 w-full p-2 border rounded mb-4"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className="text-gray-700 w-full p-2 border rounded mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </form>
            {error && (
              <p className="text-red-500 text-sm text-center mt-6">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Image Upload Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <p className="text-blue-500 text-lg mb-4">
              Would you like to update your profile image?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="text-gray-500"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="text-blue-500"
                onClick={handleProfileImageUpload}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AccountSettings;
