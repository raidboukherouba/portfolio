import { useState, useEffect } from 'react';
import { getDiplomas, deleteDiploma, Diploma } from '../../../services/diplomaService';
import DeleteModal from '../../../components/sections/deleteModal';
import DiplomasTable from '../../../components/admin/diploma/DiplomasTable';
import DiplomasNavTable from '../../../components/admin/diploma/DiplomasNavTable';

const DiplomasAdminPage = () => {
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: '',
    title: ''
  });

  useEffect(() => {
    fetchDiplomas();
  }, []);

  const fetchDiplomas = async () => {
    try {
      setIsLoading(true);
      const data = await getDiplomas();
      setDiplomas(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch diplomas');
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

  const handleDeleteDiploma = async (id: string) => {
    try {
      await deleteDiploma(id);
      setDiplomas(diplomas.filter(diploma => diploma._id !== id));
      closeModal();
    } catch (err) {
      setError('Failed to delete diploma');
      console.error(err);
      throw err;
    }
  };

  if (isLoading) {
    return <div className="text-center py-4 dark:text-gray-300">Loading diplomas...</div>;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-4 bg-white dark:bg-black min-h-screen">
      <DiplomasNavTable 
        title="Diplomas Management"
        addButtonLink="/admin/diplomas/add"
        addButtonText="New Diploma"
      />

      <DiplomasTable 
        diplomas={diplomas} 
        onDeleteClick={handleDeleteClick} 
      />

      <DeleteModal
        show={deleteModal.show}
        id={deleteModal.id}
        name={deleteModal.title}
        itemType="diploma"
        onClose={closeModal}
        onConfirm={handleDeleteDiploma}
      />
    </div>
  );
};

export default DiplomasAdminPage;