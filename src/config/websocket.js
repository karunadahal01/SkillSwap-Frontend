// src/config/websocket.js - CORRECT SUBSCRIPTION FIX
import { Client } from '@stomp/stompjs';

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
   * ✅ CRITICAL FIX: Subscribe to /user/queue/messages (Spring will route to correct session)
   */
  subscribeToMessages(userEmail, onMessage) {
    if (!this.connected) {
      console.error('❌ WebSocket not connected');
      return;
    }

    // ✅ CRITICAL: Use /user/queue/messages WITHOUT the email
    // Spring will automatically route this to the correct session-specific destination
    const destination = `/user/queue/messages`;
    
    console.log('========================================');
    console.log('📡 SUBSCRIBING TO MESSAGES');
    console.log('   User Email:', userEmail);
    console.log('   Subscription Destination:', destination);
    console.log('   Spring will route to: /queue/messages-user[SESSION_ID]');
    console.log('========================================');
    
    const subscription = this.client.subscribe(destination, (message) => {
      console.log('========================================');
      console.log('📨 RAW WEBSOCKET MESSAGE RECEIVED');
      console.log('   Destination:', message.headers.destination);
      console.log('   Message ID:', message.headers['message-id']);
      console.log('   Subscription:', message.headers.subscription);
      console.log('========================================');
      
      try {
        const data = JSON.parse(message.body);
        console.log('✅ Parsed message data:', data);
        onMessage(data);
      } catch (error) {
        console.error('❌ Error parsing message:', error);
        console.error('   Raw body:', message.body);
      }
    });

    this.subscriptions.set('messages', subscription);
    this.messageHandlers.set('messages', onMessage);
    console.log(`✅ Subscribed successfully to: ${destination}`);
  }

  /**
   * Subscribe to read receipts
   * ✅ CRITICAL FIX: Subscribe to /user/queue/read WITHOUT email
   */
  subscribeToReadReceipts(userEmail, onRead) {
    if (!this.connected) {
      console.error('❌ WebSocket not connected');
      return;
    }

    const destination = `/user/queue/read`;
    
    console.log('========================================');
    console.log('📡 SUBSCRIBING TO READ RECEIPTS');
    console.log('   User Email:', userEmail);
    console.log('   Subscription Destination:', destination);
    console.log('========================================');
    
    const subscription = this.client.subscribe(destination, (message) => {
      console.log('========================================');
      console.log('✅ READ RECEIPT RECEIVED');
      console.log('   Destination:', message.headers.destination);
      console.log('========================================');
      
      try {
        const data = JSON.parse(message.body);
        console.log('✅ Parsed read receipt:', data);
        onRead(data);
      } catch (error) {
        console.error('❌ Error parsing read receipt:', error);
      }
    });

    this.subscriptions.set('read', subscription);
    console.log(`✅ Subscribed to read receipts: ${destination}`);
  }

  /**
   * Send a chat message
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

    console.log('========================================');
    console.log('📤 SENDING MESSAGE VIA WEBSOCKET');
    console.log('   Destination: /app/chat.send');
    console.log('   Payload:', payload);
    console.log('========================================');

    this.client.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(payload),
    });

    console.log('✅ Message sent to WebSocket server');
  }

  /**
   * Mark message as read
   */
  markAsRead(messageId) {
    if (!this.connected) {
      console.error('❌ WebSocket not connected');
      return;
    }

    const payload = {
      messageId,
    };

    console.log('========================================');
    console.log('📖 SENDING MARK AS READ');
    console.log('   Destination: /app/chat.read');
    console.log('   Message ID:', messageId);
    console.log('========================================');

    this.client.publish({
      destination: '/app/chat.read',
      body: JSON.stringify(payload),
    });

    console.log('✅ Mark as read sent');
  }

  isConnected() {
    return this.connected;
  }
}

// Singleton instance
export const wsService = new WebSocketService();
export default wsService;