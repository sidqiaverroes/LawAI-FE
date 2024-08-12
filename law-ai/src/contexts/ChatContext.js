// contexts/ChatContext.js
import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatRooms, setChatRooms] = useState([]);

  return (
    <ChatContext.Provider value={{ chatRooms, setChatRooms }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
