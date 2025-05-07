import api from './appClient';

export interface Project {
  _id?: string;
  title: string;
  description?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  createdAt?: Date;
}

// 🔽 Get all projects
export const getProjects = async () => {
  const res = await api.get<Project[]>('/projects');
  return res.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// ➕ Create a new project
export const createProject = async (project: Project) => {
  const res = await api.post<Project>('/projects', project);
  return res.data;
};

// 📝 Update a project by ID
export const updateProject = async (id: string, project: Partial<Project>) => {
  const res = await api.put<Project>(`/projects/${id}`, project);
  return res.data;
};

// 🗑️ Delete a project by ID
export const deleteProject = async (id: string) => {
  const res = await api.delete<{ message: string }>(`/projects/${id}`);
  return res.data;
};
