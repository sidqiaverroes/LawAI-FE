// components/ChatRooms.js
import React, { useState, useEffect } from 'react';
import { Tabs, Spin, message } from 'antd';
import { useRouter } from 'next/router';
import { fetchChatRooms } from '@/lib/api';

const { TabPane } = Tabs;

const ChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleTabChange = (key) => {
    // Redirect to /chat/{id} for the selected room
    router.push(`/chat/${key}`);
  };

  if (loading) return <Spin tip="Loading chat rooms..." />;

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      {chatRooms.map((room) => (
        <TabPane tab={room.name} key={room.id}>
          {/* Content for the selected chat room will be shown on /chat/{id} */}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default ChatRooms;
