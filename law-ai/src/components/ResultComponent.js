import React from 'react';
import { Table } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'tailwindcss/tailwind.css';

const { Column } = Table;

const ResultComponent = ({ data }) => {
  // Extract summary and law data from the received data
  const { full_answers: summary, laws: lawData } = data;

  // Define columns for the table
  const columns = [
    {
        title: 'Jawaban',
        dataIndex: 'jawaban',
        key: 'jawaban',
    },
    {
      title: 'Judul UU',
      dataIndex: 'judul_uu',
      key: 'judul_uu',
      render: (text, record) => (
        <span className={record.pasal.length > 1 ? 'font-bold' : ''}>{text}</span>
      ),
    },
    {
        title: 'Bab',
        dataIndex: 'bab',
        key: 'bab',
      },
    {
      title: 'Pasal',
      dataIndex: 'pasal',
      key: 'pasal',
    },
  ];

  return (
    <div className=" w-[900px]">
      {/* Summary Section */}
      <div className="mb-6 text-gray-700">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {summary}
          </ReactMarkdown>
        </div>
      </div>

      {/* Table of Related Laws */}
      <Table dataSource={lawData} rowKey="id" bordered pagination={false}>
        {columns.map((column) => (
          <Column
            key={column.key}
            title={column.title}
            dataIndex={column.dataIndex}
          />
        ))}
      </Table>
    </div>
  );
};

export default ResultComponent;
