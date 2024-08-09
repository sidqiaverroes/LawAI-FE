import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const SearchBar = () => {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const isButtonDisabled = inputValue.trim() === '';

  return (
    <div
      style={{
        width: 900, // Adjust the width as needed
        height: 450, // Adjust the height as needed
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: 16,
        }}
      >
        <SearchOutlined style={{ fontSize: 20, marginRight: 8 }} />
        <span style={{ fontSize: 20, fontWeight: 'bold' }}>Cari Hukum</span>
      </div>
      <TextArea
        placeholder="Tanyakan sebuah pertanyaan tentang hukum di Indonesia."
        rows={4} // Adjust the number of rows as needed
        style={{
          width: '100%',
          height: '75%', // Adjust the height to fit your design
          padding: 12,
          resize: 'none', // Prevent manual resizing
          overflow: 'auto', // Enable scroll if necessary
        }}
        value={inputValue}
        onChange={handleInputChange}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 16,
        }}
      >
        <Button
          type="primary"
          size="large"
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? 'gray' : 'black',
            borderColor: isButtonDisabled ? 'gray' : 'black',
          }}
        >
          <SendOutlined style={{ fontSize: 18, marginRight: 8 }} />
          Kirim
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
