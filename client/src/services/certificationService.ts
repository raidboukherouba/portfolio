import api from './appClient';

export interface Certification {
  _id?: string;
  title: string;
  issuer?: string;
  date: string; // ISO string preferred
  description?: string;
  credentialUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 🔽 Get all certifications
export const getCertifications = async () => {
  const res = await api.get<Certification[]>('/certifications');
  return res.data;
};

export const getCertificationById = async (id: string): Promise<Certification> => {
  const response = await api.get(`/certifications/${id}`);
  return response.data;
};

// ➕ Create a new certification
export const createCertification = async (cert: Certification) => {
  const res = await api.post<Certification>('/certifications', cert);
  return res.data;
};

// 📝 Update a certification by ID
export const updateCertification = async (id: string, cert: Partial<Certification>) => {
  const res = await api.put<Certification>(`/certifications/${id}`, cert);
  return res.data;
};

// 🗑️ Delete a certification by ID
export const deleteCertification = async (id: string) => {
  const res = await api.delete<{ message: string }>(`/certifications/${id}`);
  return res.data;
};
