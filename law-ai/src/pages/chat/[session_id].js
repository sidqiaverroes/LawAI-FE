// pages/chat/[session_id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spin, message } from 'antd';
import { fetchChatMessages } from '@/lib/api'; // Ensure this function is defined
import ChatMessageComponent from '@/components/ChatMessageComponent';

const ChatPage = () => {
  const router = useRouter();
  const { session_id } = router.query; // Get the session_id from the URL
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      const fetchMessages = async () => {
        try {
          const chatMessages = await fetchChatMessages(session_id);
          setMessages(chatMessages);
        } catch (error) {
          message.error('Failed to load chat messages');
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    }
  }, [session_id]);

  if (loading) return <Spin tip="Loading chat messages..." />;

  return (
    <div className="bg-putih flex flex-col items-center justify-start min-h-screen pt-24 px-4">
      {/* <h1 className="text-2xl font-bold mb-4">Chat Room</h1> */}
      {messages.map((message) => (
        <ChatMessageComponent key={message.id} data={message} />
      ))}
    </div>
  );
};

export default ChatPage;
