import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import LocalStorage from '@/lib/utils/localStorage';
import { getMyAccountApi } from '@/lib/apis/users';
import Image from 'next/image';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [profileImage, setProfileImage] = useState(
    '/assets/default-avatar.jpg',
  );
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    localStorage.removeItem('profileItem');
    router.push('/login');
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      let imageUrl = localStorage.getItem('profileImage');

      if (!imageUrl) {
        try {
          let { profileImageFile: imageUrl } = await getMyAccountApi();

          localStorage.setItem('profileImage', imageUrl);
        } catch (error) {
          console.error('Failed to fetch profile image:', error);
        }
      }
      setProfileImage(imageUrl ? imageUrl : '/assets/default-avatar.jpg');
    };

    fetchProfileImage();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-blue-800 text-white flex flex-col transition-all duration-300 relative`}
      >
        <button
          className="p-4 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
        <nav className={`flex-grow ${sidebarOpen ? '' : 'hidden'}`}>
          <Link href="/create-url" className="block p-4 hover:bg-blue-700">
            Make Short URL
          </Link>
          <Link href="/" className="block p-4 hover:bg-blue-700">
            Home
          </Link>
          <Link href="/mypage" className="block p-4 hover:bg-blue-700">
            My Page
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        {/* Top bar */}
        <div className="bg-white shadow-md p-4 flex justify-end">
          <div className="relative">
            <button
              className="focus:outline-none"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              )}
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                <Link
                  href="/account"
                  className="text-gray-600 block px-4 py-2 hover:bg-gray-100"
                >
                  Account Settings
                </Link>
                <button
                  className="text-gray-600 block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowLogoutPopup(true)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">{children}</div>
      </div>

      {/* Collapsed Sidebar Icon */}
      {!sidebarOpen && (
        <div className="fixed top-4 left-4 z-50">
          <button
            className="p-4 bg-blue-800 text-white rounded-full shadow-lg focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      )}

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <p className="text-gray-700 text-lg mb-4">
              Would you like to logout?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="text-blue-500"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
              <button className="text-red-500" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
