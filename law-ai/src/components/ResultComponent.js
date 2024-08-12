import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const { Column } = Table;

const ResultComponent = ({ data }) => {
  const [lastChatRoomId, setLastChatRoomId] = useState(null);
  const router = useRouter();

  // Extract summary and law data from the received data
  const { full_answer: summary, laws: lawData } = data.answer;

  // Define columns for the table
  const allColumns = [
    {
      title: 'Penjelasan',
      dataIndex: 'jawaban',
      key: 'jawaban',
    },
    {
      title: 'Sumber Hukum',
      dataIndex: 'undang_undang',
      key: 'undang_undang',
      render: (text, record) => (
        <span className='font-bold'>{text}</span>
      ),
    },
    {
      title: 'BAB',
      dataIndex: 'bab',
      key: 'bab',
    },
    {
      title: 'Pasal',
      dataIndex: 'pasal',
      key: 'pasal',
    },
  ];

  // Filter columns based on data presence
  const filteredColumns = allColumns.filter(column => 
    lawData.some(item => item[column.dataIndex])
  );

  const fetchChatRooms = async () => {
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
      if (rooms.length > 0) {
        setLastChatRoomId(rooms[rooms.length - 1].id); // Get the last room's ID
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const handleGoToChatRoom = () => {
    if (lastChatRoomId !== null) {
      router.push(`/chat/${lastChatRoomId}`); // Navigate to the last chat room
    }
  };

  return (
    <div className="w-[900px]">
      {/* Summary Section */}
      <div className="mb-6 text-gray-700">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="prose text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {summary}
          </ReactMarkdown>
        </div>
      </div>

      {/* Table of Related Laws */}
      <Table dataSource={lawData} rowKey="id" bordered pagination={false}>
        {filteredColumns.map((column) => (
          <Column
            key={column.key}
            title={column.title}
            dataIndex={column.dataIndex}
            render={column.render}
          />
        ))}
      </Table>

      {/* Button to go to the last chat room */}
      <div className="mt-4 flex justify-center">
        <Button
          type="primary"
          onClick={handleGoToChatRoom}
          disabled={lastChatRoomId === null} // Disable button if no chat room ID
          className='text-md px-6 py-4'
        >
          Ask follow up question
        </Button>
      </div>
    </div>
  );
};

export default ResultComponent;
