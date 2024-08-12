// pages/chat/[session_id].js
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Spin, message, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons'; // Import the Send icon
import { fetchChatMessages } from '@/lib/api'; // Ensure this function is defined
import ChatMessageComponent from '@/components/ChatMessageComponent';

const { TextArea } = Input;

const ChatPage = () => {
  const router = useRouter();
  const { session_id } = router.query; // Get the session_id from the URL
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const textareaRef = useRef(null);

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

  const handleSend = () => {
    // Handle sending the message
    console.log('Sending message:', newMessage);
    setNewMessage(''); // Clear the input after sending
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  if (loading) return <Spin tip="Loading chat messages..." />;

  return (
    <div className="relative flex flex-col min-h-screen items-center">
      <div className="flex-1 overflow-y-auto bg-putih pt-24 pb-16">
        {messages.map((message) => (
          <ChatMessageComponent key={message.id} data={message} />
        ))}
      </div>

      {/* Chat Bar */}
      <div className="sticky bottom-8 bg-white border-t shadow-md rounded-xl flex flex-row items-center p-4">
        <TextArea
          ref={textareaRef}
          value={newMessage}
          onChange={handleChange}
          placeholder="Type a message..."
          autoSize={{ minRows: 1, maxRows: 6 }}
          className="resize-none mr-3 border-0 outline-none hover:border-none focus:border-none focus:outline-none focus:ring-0"
          style={{ width: '900px' }}
        />
        <Button onClick={handleSend} type="primary" className="self-end" icon={<SendOutlined />} />
      </div>
    </div>
  );
};

export default ChatPage;
