// components/ChatMessageComponent.js
import React from 'react';
import { Table } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'tailwindcss/tailwind.css';

const { Column } = Table;

const ChatMessageComponent = ({ data }) => {
  // Extract question, summary, and law data from the received data
  const { question, answer } = data;
  const { full_answer: summary, laws: lawData } = answer;

  return (
    <div className="w-[900px] mb-12">
      {/* Question Section */}
    <div className='flex justify-end'>
        <div className="mb-4 flex justify-end bg-white shadow-md rounded-t-xl rounded-bl-xl px-6 py-4">
            <p className="text-sm text-gray-600">{question}</p>
        </div>
    </div>

      {/* Summary Section */}
      <div className="mb-6 text-gray-700">
        <h2 className="text-lg font-semibold mb-4">Summary:</h2>
        <div className="prose text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {summary}
          </ReactMarkdown>
        </div>
      </div>

      {/* Table of Related Laws */}
      <Table dataSource={lawData} rowKey="id" bordered pagination={false}>
        {[
          { title: 'Penjelasan', dataIndex: 'jawaban', key: 'jawaban' },
          {
            title: 'Sumber Hukum',
            dataIndex: 'undang_undang',
            key: 'undang_undang',
            render: (text, record) => (
              <span className={record.pasal.length > 1 ? 'font-bold' : ''}>{text}</span>
            ),
          },
          { title: 'BAB', dataIndex: 'bab', key: 'bab' },
          { title: 'Pasal', dataIndex: 'pasal', key: 'pasal' },
        ].map((column) => (
          <Column
            key={column.key}
            title={column.title}
            dataIndex={column.dataIndex}
            render={column.render}
          />
        ))}
      </Table>
    </div>
  );
};

export default ChatMessageComponent;
