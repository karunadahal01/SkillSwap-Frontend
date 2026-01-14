// src/config/websocket.js
// Alternative version using native WebSocket (no SockJS dependency)
import { Client } from '@stomp/stompjs';

// ✅ Use environment variable, fallback to your IP
const WS_URL = import.meta.env.VITE_WS_URL || 'http://192.168.1.75:8080/ws';

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscriptions = new Map();
    this.messageHandlers = new Map();
  }

  connect(token) {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        console.log('✅ WebSocket already connected');
        resolve();
        return;
      }

      // Convert http:// to ws:// or https:// to wss://
      const wsUrl = WS_URL.replace(/^http/, 'ws');

      this.client = new Client({
        brokerURL: wsUrl,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => {
          console.log('[STOMP Debug]:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.client.onConnect = (frame) => {
        console.log('✅ WebSocket Connected:', frame);
        this.connected = true;
        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error('❌ STOMP Error:', frame.headers['message']);
        console.error('Details:', frame.body);
        this.connected = false;
        reject(new Error(frame.headers['message']));
      };

      this.client.onWebSocketClose = () => {
        console.log('🔌 WebSocket Disconnected');
        this.connected = false;
      };

      this.client.onWebSocketError = (error) => {
        console.error('❌ WebSocket Error:', error);
        this.connected = false;
      };

      this.client.activate();
    });
  }

  disconnect() {
    if (this.client) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
      this.subscriptions.clear();
      this.messageHandlers.clear();
      this.client.deactivate();
      this.connected = false;
      console.log('🔌 WebSocket Disconnected');
    }
  }

  /**
   * Subscribe to user's private message queue
   * @param {number} userId - Current user's ID
   * @param {Function} onMessage - Callback when message received
   */
  subscribeToMessages(userId, onMessage) {
    if (!this.connected) {
      console.error('❌ WebSocket not connected');
      return;
    }

    const destination = `/user/${userId}/queue/messages`;
    
    const subscription = this.client.subscribe(destination, (message) => {
      try {
        const data = JSON.parse(message.body);
        console.log('📨 New message received:', data);
        onMessage(data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    this.subscriptions.set('messages', subscription);
    this.messageHandlers.set('messages', onMessage);
    console.log(`✅ Subscribed to messages: ${destination}`);
  }

  /**
   * Subscribe to read receipts
   * @param {number} userId - Current user's ID
   * @param {Function} onRead - Callback when message is read
   */
  subscribeToReadReceipts(userId, onRead) {
    if (!this.connected) {
      console.error('❌ WebSocket not connected');
      return;
    }

    const destination = `/user/${userId}/queue/read`;
    
    const subscription = this.client.subscribe(destination, (message) => {
      try {
        const data = JSON.parse(message.body);
        console.log('✅ Message read:', data);
        onRead(data);
      } catch (error) {
        console.error('Error parsing read receipt:', error);
      }
    });

    this.subscriptions.set('read', subscription);
    console.log(`✅ Subscribed to read receipts: ${destination}`);
  }

  /**
   * Send a chat message
   * @param {number} receiverId 
   * @param {string} content 
   */
  sendMessage(receiverId, content) {
    if (!this.connected) {
      console.error('❌ WebSocket not connected');
      throw new Error('WebSocket not connected');
    }

    const payload = {
      receiverId,
      content,
    };

    this.client.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(payload),
    });

    console.log('📤 Message sent:', payload);
  }

  /**
   * Mark message as read
   * @param {number} messageId 
   */
  markAsRead(messageId) {
    if (!this.connected) {
      console.error('❌ WebSocket not connected');
      return;
    }

    const payload = {
      messageId,
    };

    this.client.publish({
      destination: '/app/chat.read',
      body: JSON.stringify(payload),
    });

    console.log('✅ Marked as read:', messageId);
  }

  isConnected() {
    return this.connected;
  }
}

// Singleton instance
export const wsService = new WebSocketService();
export default wsService;