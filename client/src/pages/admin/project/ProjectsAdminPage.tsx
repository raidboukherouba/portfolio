import { useState, useEffect } from 'react';
import { getProjects, deleteProject, Project } from '../../../services/projectService';
import DeleteModal from '../../../components/sections/deleteModal';
import ProjectsTable from '../../../components/admin/project/ProjectsTable';
import ProjectsNavTable from '../../../components/admin/project/ProjectsNavTable';

const ProjectsAdminPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: '',
    title: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteModal({
      show: true,
      id,
      title
    });
  };

  const closeModal = () => {
    setDeleteModal({
      show: false,
      id: '',
      title: ''
    });
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project._id !== id));
      closeModal();
    } catch (err) {
      setError('Failed to delete project');
      console.error(err);
      throw err;
    }
  };

  if (isLoading) {
    return <div className="text-center py-4 dark:text-gray-300">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-4 bg-white dark:bg-black min-h-screen">
      <ProjectsNavTable 
        title="Projects Management"
        addButtonLink="/admin/projects/add"
        addButtonText="New Project"
      />

      <ProjectsTable 
        projects={projects} 
        onDeleteClick={handleDeleteClick} 
      />

      <DeleteModal
        show={deleteModal.show}
        id={deleteModal.id}
        name={deleteModal.title}
        itemType="project"
        onClose={closeModal}
        onConfirm={handleDeleteProject}
      />
    </div>
  );
};

export default ProjectsAdminPage;