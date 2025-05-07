import api from './appClient';

export interface Profile {
  _id?: string;
  firstName: string;
  lastName: string;
  profession?: string;
  avatar?: string;
  bio?: string;
  age?: number;
  location?: {
    city?: string;
    country?: string;
  };
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  cv?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 🔍 Get the profile
export const getProfile = async () => {
  const res = await api.get<Profile>('/profile');
  return res.data;
};

// ➕ Create or update the profile
export const createOrUpdateProfile = async (profileData: Profile) => {
  const res = await api.post<Profile>('/profile', profileData);
  return res.data;
};
