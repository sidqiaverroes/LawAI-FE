import React, { useState, useEffect } from 'react';
import { Tabs, Spin, Button, Modal, message, Input } from 'antd';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { EllipsisOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ChatRooms = ({ resetActiveKey }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(null); // Internal state for active key
  const [visible, setVisible] = useState(false); // State to control modal visibility
  const [currentRoom, setCurrentRoom] = useState(null); // State to hold current room data
  const [newRoomName, setNewRoomName] = useState(''); // State to handle room name input
  const router = useRouter();

  const maxLength = 15; // Maximum number of characters to display in the tab

  const getChatRooms = async () => {
    try {
      const token = Cookies.get('access_token'); // Retrieve token from cookies

      const response = await fetch('https://deekyudev.my.id/sessions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chat rooms');
      }

      const rooms = await response.json();
      setChatRooms(rooms);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Failed to fetch chat rooms');
    }
  };

  useEffect(() => {
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

  const handleOptionsClick = (room) => {
    setCurrentRoom(room);
    setNewRoomName(room.name); // Set the room name in the input field
    setVisible(true); // Show the modal when options button is clicked
  };

  const handleUpdate = async () => {
    try {
      const token = Cookies.get('access_token'); // Retrieve token from cookies

      const response = await fetch(`https://deekyudev.my.id/sessions/${currentRoom.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newRoomName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update chat room');
      }

      message.success('Chat room updated successfully!');
      setVisible(false);
      // Call getChatRooms to refresh the list
      await getChatRooms();
    } catch (error) {
      message.error('Failed to update chat room');
      console.error('Error updating chat room:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get('access_token'); // Retrieve token from cookies

      const response = await fetch(`https://deekyudev.my.id/sessions/${currentRoom.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat room');
      }

      message.success('Chat room deleted successfully!');
      setVisible(false);
      // Call getChatRooms to refresh the list
      await getChatRooms();
    } catch (error) {
      message.error('Failed to delete chat room');
      console.error('Error deleting chat room:', error);
    }
  };

  const handleCancel = () => {
    setVisible(false); // Hide the modal when cancel is clicked
  };

  if (loading) return <Spin tip="Loading chat rooms..." />;

  return (
    <>
      <Tabs activeKey={activeKey} onChange={handleTabChange}>
        {chatRooms.map((room) => {
          // Truncate and concatenate the room name
          const displayName = room.name.length > maxLength ? room.name.substring(0, maxLength) + '...' : room.name;

          return (
            <TabPane
              tab={
                <div className="flex items-center">
                  {displayName}
                  <Button
                    type="text"
                    icon={<EllipsisOutlined />}
                    onClick={() => handleOptionsClick(room)}
                    className="ml-2"
                  />
                </div>
              }
              key={room.id}
            >
              {/* Content for the selected chat room will be shown on /chat/{id} */}
            </TabPane>
          );
        })}
      </Tabs>

      <Modal
        title="Rename"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="delete" type="danger" onClick={handleDelete} icon={<DeleteOutlined />}>
            Delete
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate} icon={<EditOutlined />}>
            Update
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <div>
          <Input
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Enter new chat room name"
          />
        </div>
      </Modal>
    </>
  );
};

export default ChatRooms;
