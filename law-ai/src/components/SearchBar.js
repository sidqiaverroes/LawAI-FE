import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, SendOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { TextArea } = Input;

const SearchBar = ({ onApiResponse }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [loadings, setLoadings] = React.useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const isButtonDisabled = inputValue.trim() === '';

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  const handleClick = async () => {
    if (!isButtonDisabled) {
      enterLoading(0);
      try {
        const response = await fetch('http://localhost:8000/sessions/3/chats/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'first',
            question: inputValue,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        onApiResponse(data); // Pass the API response to the parent
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className="w-[900px] h-full bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <SearchOutlined className="text-gray-500 text-md mr-2" />
        <span className="text-md font-medium text-gray-500">Cari Hukum</span>
      </div>
      <TextArea
        placeholder="Tanyakan sebuah pertanyaan tentang hukum di Indonesia."
        rows={5}
        className="w-full h-[75%] p-2 resize-none overflow-auto border-0 outline-none hover:border-none focus:border-none focus:outline-none focus:ring-0"
        value={inputValue}
        onChange={handleInputChange}
        style={{ resize: 'none' }}
      />
      <div className="flex justify-end mt-4">
        <Button
          size="large"
          disabled={isButtonDisabled}
          className={`flex items-center transition-colors ${
            isButtonDisabled
              ? 'bg-gray-500 border-0 text-gray-700'
              : 'bg-black border-black text-white hover:bg-gray-800'
          }`}
          style={{
            borderColor: isButtonDisabled ? 'gray' : 'black',
          }}
          loading={loadings[0]}
          onClick={handleClick}
          icon={<SendOutlined className="text-lg" />}
        >
          Kirim
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
