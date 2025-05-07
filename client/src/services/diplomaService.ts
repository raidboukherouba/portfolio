import api from './appClient';

export interface Diploma {
  _id?: string;
  title: string;
  institution?: string;
  field?: string;
  date: string; // ISO date string (e.g., "2024-06-01")
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 🔽 Get all diplomas
export const getDiplomas = async () => {
  const res = await api.get<Diploma[]>('/diplomas');
  return res.data;
};

export const getDiplomaById = async (id: string): Promise<Diploma> => {
  const response = await api.get(`/diplomas/${id}`);
  return response.data;
};

// ➕ Create a new diploma
export const createDiploma = async (diploma: Diploma) => {
  const res = await api.post<Diploma>('/diplomas', diploma);
  return res.data;
};

// 📝 Update a diploma by ID
export const updateDiploma = async (id: string, diploma: Partial<Diploma>) => {
  const res = await api.put<Diploma>(`/diplomas/${id}`, diploma);
  return res.data;
};

// 🗑️ Delete a diploma by ID
export const deleteDiploma = async (id: string) => {
  const res = await api.delete<{ message: string }>(`/diplomas/${id}`);
  return res.data;
};
