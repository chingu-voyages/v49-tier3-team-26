import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { database } from '../firebaseConfig';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';

interface Admin {
  id: string;
  username: string;
}

interface Message {
  sender_id: string;
  message: string;
  timestamp: number;
}

function Chat() {
  const { user } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await axios.get('/api/auth/online-admins', { withCredentials: true });
      setAdmins(response.data);
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    if (selectedAdmin) {
      const chatId = user!.id < selectedAdmin.id ? `${user!.id}_${selectedAdmin.id}` : `${selectedAdmin.id}_${user!.id}`;
      const messagesRef = ref(database, `messages/${chatId}`);

      onValue(messagesRef, (snapshot) => {
        const msgs: Message[] = [];
        snapshot.forEach((childSnapshot) => {
          msgs.push(childSnapshot.val());
        });
        setMessages(msgs);
      });
    }
  }, [selectedAdmin, user]);

  const sendMessage = async () => {
    if (!selectedAdmin) return;

    const chatId = user!.id < selectedAdmin.id ? `${user!.id}_${selectedAdmin.id}` : `${selectedAdmin.id}_${user!.id}`;
    const messageRef = push(ref(database, `messages/${chatId}`));
    await messageRef.set({
      sender_id: user!.id,
      message,
      timestamp: serverTimestamp(),
    });
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        <h3>Select an Admin</h3>
        <ul>
          {admins.map((admin) => (
            <li key={admin.id} onClick={() => setSelectedAdmin(admin)}>
              {admin.username}
            </li>
          ))}
        </ul>
      </div>
      {selectedAdmin && (
        <div>
          <h3>Chat with {selectedAdmin.username}</h3>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender_id === user!.id ? 'Me' : selectedAdmin.username}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
