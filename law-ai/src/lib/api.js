// lib/api.js
export const fetchChatRooms = async () => {
    const response = await fetch('https://deekyudev.my.id/sessions');
    if (!response.ok) {
      throw new Error('Failed to fetch chat rooms');
    }
    return response.json();
  };

export const fetchChatMessages = async (session_id) => {
    const response = await fetch(`https://deekyudev.my.id/sessions/${session_id}/chats/`);
    if (!response.ok) {
      throw new Error('Failed to fetch chat messages');
    }
    return response.json();
  };
  
  