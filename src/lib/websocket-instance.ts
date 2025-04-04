import {refreshTokens} from "@/lib/api-instance";

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080/ws';

export const connectToWebSocket = async (): Promise<WebSocket> => {
  const refreshedToken = await refreshTokens();
  if (refreshedToken) {
    const accessToken = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user') as string);

    const socket = new WebSocket(`${WEBSOCKET_URL}/${user.userId}?token=${accessToken}`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onclose = async (event) => {
      console.log('WebSocket connection closed', event);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return socket;
  }
  return Promise.reject(new Error('Failt to connect websocket'));
};