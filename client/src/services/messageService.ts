import api from './appClient';

export interface Message {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

// 📥 Get all messages (sorted by newest first)
export const getAllMessages = async () => {
  const res = await api.get<Message[]>('/messages/all');
  return res.data;
};



export const getMessages = async (
  page: number = 1,
  limit: number = 10,
  email?: string,
  name?: string,
  read?: boolean,
  startDate?: string, // ISO format: '2024-01-01'
  endDate?: string    // ISO format: '2024-12-31'
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (email) params.append('email', email);
  if (name) params.append('name', name);
  if (read !== undefined) params.append('read', read.toString());
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  const res = await api.get<{
    total: number;
    page: number;
    pages: number;
    messages: Message[];
  }>(`/messages/?${params.toString()}`);

  return res.data;
};




// ➕ Send a new message
export const sendMessage = async (message: Omit<Message, '_id' | 'createdAt' | 'read'>) => {
  const res = await api.post<Message>('/messages', message);
  return res.data;
};

// 📌 Mark a message as read
export const markMessageAsRead = async (id: string) => {
  const res = await api.patch<Message>(`/messages/${id}/read`);
  return res.data;
};

// 🗑️ Delete a message
export const deleteMessage = async (id: string) => {
  const res = await api.delete<{ message: string }>(`/messages/${id}`);
  return res.data;
};
