// lib/api.js
import Cookies from 'js-cookie';

export const fetchChatMessages = async (session_id) => {
    const token = Cookies.get('access_token');
    const response = await fetch(`https://deekyudev.my.id/sessions/${session_id}/chats/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in the Authorization header
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch chat messages');
    }
    return response.json();
  };


const fetchWithAuth = async (url, options = {}) => {
  const token = Cookies.get('access_token');

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header if required
    },
    credentials: 'include', // Ensure cookies are included in requests
  });

  return response;
};

export default fetchWithAuth;

  