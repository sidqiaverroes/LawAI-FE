// components/Navbar.js
import React, { useEffect } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, BookOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import ChatRooms from './ChatRooms';

const { Header } = Layout;

const Navbar = () => {
  const { username, logout } = useAuth(); // Get username and logout function from context
  const router = useRouter();

  useEffect(() => {
    // Optionally, you can add logic here to perform actions when the username changes
  }, [username]);

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      // Call logout function from context
      logout();
      // Redirect to the login page
      router.push('/auth');
    }
  };

  // Example profile picture path; replace with actual logic if needed
  const profilePicPath = null; // or use a condition to check if image exists

  const menu = (
    <Menu onClick={handleMenuClick} theme="light">
      <Menu.Item key="settings">
        <Link href="/account/settings">
          <span>Account Settings</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-putih text-black flex items-center justify-between px-96 pt-2 fixed top-0 left-0 w-full z-10 h-auto">
      <div className="flex items-center flex-shrink-0 pb-4">
        <BookOutlined className="text-gray-500" style={{ fontSize: 24 }} />
        <Link href="/">
          <span className="ml-4 text-lg font-semibold text-gray-500">Law AI</span>
        </Link>
        
      </div>

      <Link href="/" className="inline-flex items-center px-3 py-3 mb-2 bg-white rounded-full shadow-sm hover:bg-gray-100">
          <PlusOutlined className="text-gray-500" style={{ fontSize: 16 }} />
          <span className="ml-2 text-sm text-gray-500">New Chat</span>
        </Link>

      <div className="flex items-center max-w-lg overflow-x-auto whitespace-nowrap">
        <ChatRooms />
      </div>
      
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="flex items-center cursor-pointer pb-4">
          {profilePicPath ? (
            <Image
              src={profilePicPath} // Replace with your profile picture path
              alt="Profile"
              width={32}  // Adjust width as needed
              height={32} // Adjust height as needed
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full">
              <UserOutlined className="text-gray-500" style={{ fontSize: 16 }} />
            </div>
          )}
          <span className="ml-2 text-md text-gray-500">{username || 'Username'}</span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
