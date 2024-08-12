import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Spin, message, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons'; // Import the Send icon
import Cookies from 'js-cookie'; // Import js-cookie for token retrieval
import { fetchChatMessages } from '@/lib/api'; // Ensure this function is defined
import ChatMessageComponent from '@/components/ChatMessageComponent';

const { TextArea } = Input;

const ChatPage = () => {
  const router = useRouter();
  const { session_id } = router.query; // Get the session_id from the URL
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false); // State for button loading
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

  const handleSend = async () => {
    if (newMessage.trim() === '') return; // Avoid sending empty messages

    setSending(true); // Set sending to true when starting to send
    try {
      const token = Cookies.get('access_token'); // Retrieve token from cookies

      const response = await fetch(`https://deekyudev.my.id/sessions/${session_id}/chats/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
        body: JSON.stringify({
          type: 'followup',
          question: newMessage, // Use newMessage as the question
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const chatResponse = await response.json();
      setMessages([...messages, chatResponse]); // Update messages with the new response
      setNewMessage(''); // Clear the input after sending
    } catch (error) {
      message.error('Failed to send message');
      console.error('Error sending message:', error);
    } finally {
      setSending(false); // Set sending to false when done
    }
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
        <Button
          onClick={handleSend}
          type="primary"
          className="self-end"
          icon={<SendOutlined />}
          loading={sending} // Show loading state when sending is true
          disabled={newMessage.trim() === ''} // Disable button if newMessage is empty
        />
      </div>
    </div>
  );
};

export default ChatPage;
