import { useState, useEffect } from 'react';
import { getCertifications, deleteCertification, Certification } from '../../../services/certificationService';
import DeleteModal from '../../../components/sections/deleteModal';
import CertificationsTable from '../../../components/admin/certification/CertificationsTable';
import CertificationsNavTable from '../../../components/admin/certification/CertificationsNavTable';

const CertificationsAdminPage = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: '',
    title: ''
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setIsLoading(true);
      const data = await getCertifications();
      setCertifications(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch certifications');
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

  const handleDeleteCertification = async (id: string) => {
    try {
      await deleteCertification(id);
      setCertifications(certifications.filter(certification => certification._id !== id));
      closeModal();
    } catch (err) {
      setError('Failed to delete certification');
      console.error(err);
      throw err;
    }
  };

  if (isLoading) {
    return <div className="text-center py-4 dark:text-gray-300">Loading certifications...</div>;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-4 bg-white dark:bg-black min-h-screen">
      <CertificationsNavTable 
        title="Certifications Management"
        addButtonLink="/admin/certifications/add"
        addButtonText="New Certification"
      />
      
      <CertificationsTable
        certifications={certifications} 
        onDeleteClick={handleDeleteClick} 
      />

      <DeleteModal
        show={deleteModal.show}
        id={deleteModal.id}
        name={deleteModal.title}
        itemType="certification"
        onClose={closeModal}
        onConfirm={handleDeleteCertification}
      />
    </div>
  );
};

export default CertificationsAdminPage;