// components/ChatMessageComponent.js
import React from 'react';
import { Table } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const { Column } = Table;

const ChatMessageComponent = ({ data }) => {
  // Extract question, summary, and law data from the received data
  const { question, answer } = data;
  const { full_answer: summary, laws: lawData } = answer;

  return (
    <div className="w-[900px] mb-12">
      {/* Question Section */}
      <div className='flex justify-end mb-6'>
        <div className="flex h-auto justify-end items-center bg-white shadow-md rounded-t-xl rounded-bl-xl px-4 py-3">
          <p className="text-sm text-gray-600">{question}</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-6 text-gray-700">
        <div className="prose text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {summary}
          </ReactMarkdown>
        </div>
      </div>

      {/* Table of Related Laws - Render only if lawData is not empty */}
      {lawData && lawData.length > 0 && (
        <Table dataSource={lawData} rowKey="id" bordered pagination={false}>
          {[
            { title: 'Penjelasan', dataIndex: 'jawaban', key: 'jawaban' },
            {
              title: 'Sumber Hukum',
              dataIndex: 'undang_undang',
              key: 'undang_undang',
              render: (text, record) => (
                <span className='font-bold'>{text}</span>
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
      )}
    </div>
  );
};

export default ChatMessageComponent;
