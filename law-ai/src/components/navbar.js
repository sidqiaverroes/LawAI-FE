import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const { Header } = Layout;

const Navbar = () => {
  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      // Handle logout logic here
      console.log('Logging out...');
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
    <Header className="bg-putih text-black flex justify-between items-center p-4 px-96 fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
        <BookOutlined className="text-gray-500" style={{ fontSize: 24 }} />
        <Link href="/">
          <span className="ml-4 text-lg font-semibold text-gray-500">Law AI</span>
        </Link>
      </div>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="flex items-center cursor-pointer">
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
          <span className="ml-2 text-md text-gray-500">Username</span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default Navbar;