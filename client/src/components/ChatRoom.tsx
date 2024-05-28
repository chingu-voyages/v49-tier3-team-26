import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages } from '../chatService';
import { useAuth } from '../AuthContext';
import { Message } from '../types';
import styles from './ChatRoom.module.css';

function ChatRoom() {
  const { user } = useAuth();
  const chatRoomId = 'defaultRoom';
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const unsubscribe = getMessages(chatRoomId, setMessages);
    return () => unsubscribe();
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      await sendMessage(chatRoomId, user?.email || 'unknown', message);
      setMessage(''); 
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatRoom}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.message}>
            <strong>{msg.userId}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Message"
        className={styles.input}
      />
      <button onClick={handleSendMessage} className={styles.sendButton}>Send</button>
    </div>
  );
}

export default ChatRoom;
