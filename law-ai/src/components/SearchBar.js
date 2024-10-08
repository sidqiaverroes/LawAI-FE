import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, SendOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import Cookies from 'js-cookie'; // Import Cookies to retrieve token

const { TextArea } = Input;

const SearchBar = ({ onApiResponse }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false); // State for button loading

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const isButtonDisabled = inputValue.trim() === '';

  const handleClick = async () => {
    if (isButtonDisabled) return; // Avoid sending empty messages

    setLoading(true); // Set loading to true when starting to send
    try {
      const token = Cookies.get('access_token'); // Retrieve token from cookies

      // Extract the first few words for the session name
      const sessionName = inputValue.split(' ').slice(0, 4).join(' ') || 'new chat'; // Default to 'new chat' if empty

      // Step 1: Create a new session
      const createSessionResponse = await fetch('https://deekyudev.my.id/sessions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
        body: JSON.stringify({ name: sessionName }), // Use extracted session name
      });

      if (!createSessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      const sessionData = await createSessionResponse.json();
      const sessionId = sessionData.id; // Extract session ID from the response

      // Step 2: Fetch chat data
      const chatResponse = await fetch(`https://deekyudev.my.id/sessions/${sessionId}/chats/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
        body: JSON.stringify({
          type: 'first',
          question: inputValue,
        }),
      });

      if (!chatResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await chatResponse.json();
      onApiResponse(data); // Pass the API response to the parent

      // Optionally reload the page
      // window.location.reload(); // Reload the page after successful request
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when done
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
          loading={loading} // Show loading state when loading is true
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
