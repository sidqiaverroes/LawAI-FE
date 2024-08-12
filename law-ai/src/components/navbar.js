// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Spin, message } from 'antd';
import { UserOutlined, BookOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import Cookies from 'js-cookie';
import ChatRooms from './ChatRooms';

const { Header } = Layout;

const Navbar = () => {
  const { username, logout } = useAuth(); // Get username and logout function from context
  const router = useRouter();
  const [resetActiveKey, setResetActiveKey] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const token = Cookies.get('access_token'); // Retrieve token from cookies
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await fetch('https://deekyudev.my.id/sessions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the Authorization header
          },
        });
  
        if (!response.ok) {
          const errorDetails = await response.text(); // Get error details
          throw new Error(`Failed to fetch chat rooms: ${errorDetails}`);
        }
  
        const rooms = await response.json();
        setChatRooms(rooms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chat rooms:', error.message);
        setLoading(false);
      }
    };
  
    getChatRooms();
  }, []);
  

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      // Call logout function from context
      logout();
      // Redirect to the login page
      router.push('/auth');
    }
  };

  const handleNewChatClick = () => {
    setResetActiveKey(true); // Trigger reset of activeKey in ChatRooms
    router.push('/'); // Redirect to the home page
    setTimeout(() => setResetActiveKey(false), 0); // Reset after navigation
  };

  // Example profile picture path; replace with actual logic if needed
  const profilePicPath = null; // or use a condition to check if image exists

  const menu = (
    <Menu onClick={handleMenuClick} theme="light">
      {/* <Menu.Item key="settings">
        <Link href="/account/settings">
          <span>Account Settings</span>
        </Link>
      </Menu.Item> */}
      <Menu.Item key="logout">
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white text-black flex items-center justify-center px-6 pt-2 fixed top-0 left-0 w-full z-10 h-auto">
      <div className='flex items-center justify-between w-full max-w-4xl'>
        <div className="flex items-center flex-shrink-0">
          <BookOutlined className="text-gray-500" style={{ fontSize: 24 }} />
          <Link href="/">
            <span className="ml-4 text-lg font-semibold text-gray-500">Law AI</span>
          </Link>
        </div>

        <button
          onClick={handleNewChatClick}
          className="inline-flex items-center px-3 py-3 mb-3 bg-white rounded-full shadow-sm hover:bg-gray-100"
        >
          <PlusOutlined className="text-gray-500" style={{ fontSize: 16 }} />
          <span className="ml-2 text-sm text-gray-500">New Chat</span>
        </button>

        {loading ? (
          <Spin tip="Loading chat rooms..." className="mr-4" />
        ) : chatRooms.length > 0 ? (
          <div className="flex items-center max-w-lg overflow-auto whitespace-nowrap">
            <ChatRooms resetActiveKey={resetActiveKey} />
          </div>

        ) : null}

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
            <span className="ml-2 text-md text-gray-500">{username || 'username'}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
