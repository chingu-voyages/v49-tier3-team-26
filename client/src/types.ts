// types.ts

import { Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  userId: string;
  message: string;
  timestamp: Timestamp;
}
