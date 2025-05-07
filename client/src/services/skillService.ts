import api from './appClient';

export interface Skill {
  _id?: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced'; // default is Beginner
  category?: string;
  logo?: string; // 🔽 Added logo field
}

// 🔽 Get all skills
export const getSkills = async () => {
  const res = await api.get<Skill[]>('/skills');
  return res.data;
};

// ➕ Create a new skill
export const createSkill = async (skill: Skill) => {
  const res = await api.post<Skill>('/skills', skill);
  return res.data;
};

export const getSkillById = async (id: string): Promise<Skill> => {
  const response = await api.get(`/skills/${id}`);
  return response.data;
};

// 📝 Update a skill by ID
export const updateSkill = async (id: string, skill: Partial<Skill>) => {
  const res = await api.put<Skill>(`/skills/${id}`, skill);
  return res.data;
};

// 🗑️ Delete a skill by ID
export const deleteSkill = async (id: string) => {
  const res = await api.delete<{ message: string }>(`/skills/${id}`);
  return res.data;
};
