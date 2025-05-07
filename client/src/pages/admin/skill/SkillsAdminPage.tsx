import { useState, useEffect } from 'react';
import { getSkills, deleteSkill, Skill } from '../../../services/skillService';
import DeleteModal from '../../../components/sections/deleteModal';
import SkillsTable from '../../../components/admin/skill/SkillsTable';
import SkillsNavTable from '../../../components/admin/skill/SkillsNavTable';

const SkillsAdminPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: '',
    name: ''
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const data = await getSkills();
      setSkills(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch skills');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({
      show: true,
      id,
      name
    });
  };

  const closeModal = () => {
    setDeleteModal({
      show: false,
      id: '',
      name: ''
    });
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await deleteSkill(id);
      setSkills(skills.filter(skill => skill._id !== id));
      closeModal();
    } catch (err) {
      setError('Failed to delete skill');
      console.error(err);
      throw err;
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading skills...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-4 bg-white dark:bg-black min-h-screen">
      <SkillsNavTable 
        title="Skills Management"
        addButtonLink="/admin/skills/add"
        addButtonText="New Skill"
      />

      <SkillsTable 
        skills={skills} 
        onDeleteClick={handleDeleteClick} 
      />

      <DeleteModal
        show={deleteModal.show}
        id={deleteModal.id}
        name={deleteModal.name}
        itemType="skill"
        onClose={closeModal}
        onConfirm={handleDeleteSkill}
      />
    </div>
  );
};

export default SkillsAdminPage;