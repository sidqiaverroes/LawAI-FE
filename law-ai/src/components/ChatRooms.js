// components/ChatRooms.js
import React, { useState, useEffect } from 'react';
import { Tabs, Spin, message } from 'antd';
import { useRouter } from 'next/router';
import { fetchChatRooms } from '@/lib/api';

const { TabPane } = Tabs;

const ChatRooms = ({ resetActiveKey }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(null); // Internal state for active key
  const router = useRouter();

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const rooms = await fetchChatRooms();
        setChatRooms(rooms);
        setLoading(false);
      } catch (error) {
        message.error('Failed to load chat rooms');
        setLoading(false);
      }
    };

    getChatRooms();
  }, []);

  useEffect(() => {
    if (resetActiveKey) {
      setActiveKey(null); // Reset the activeKey when resetActiveKey changes
    }
  }, [resetActiveKey]);

  const handleTabChange = (key) => {
    setActiveKey(key); // Set the active key when tab changes
    router.push(`/chat/${key}`); // Redirect to the selected chat room
  };

  if (loading) return <Spin tip="Loading chat rooms..." />;

  return (
    <Tabs
      activeKey={activeKey}
      onChange={handleTabChange}
    >
      {chatRooms.map((room) => (
        <TabPane tab={room.name} key={room.id}>
          {/* Content for the selected chat room will be shown on /chat/{id} */}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default ChatRooms;
