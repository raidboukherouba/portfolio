import { useState, useEffect } from 'react';
import { 
    getMessages, 
    deleteMessage, 
    markMessageAsRead,
    Message 
} from '../../../services/messageService';
import DeleteModal from '../../../components/sections/deleteModal';
import MessagesTable from '../../../components/admin/message/MessagesTable';
import MessagesNavTable from '../../../components/admin/message/MessagesNavTable';
import Pagination from '../../../components/ui/Pagination';

const MessagesAdminPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: '',
    name: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    readStatus: 'all', // 'all', 'read', 'unread'
    startDate: '',
    endDate: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({
    readStatus: 'all',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchMessages();
  }, [pagination.page, pagination.limit, appliedSearchTerm, appliedFilters]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const data = await getMessages(
        pagination.page, 
        pagination.limit,
        appliedSearchTerm.includes('@') ? appliedSearchTerm : undefined,
        !appliedSearchTerm.includes('@') ? appliedSearchTerm : undefined,
        appliedFilters.readStatus === 'all' 
          ? undefined 
          : appliedFilters.readStatus === 'read',
        appliedFilters.startDate || undefined,
        appliedFilters.endDate || undefined
      );
      setMessages(data.messages);
      setPagination(prev => ({
        ...prev,
        total: data.total,
        pages: data.pages
      }));
      setError('');
    } catch (err) {
      setError('Failed to fetch messages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedFilters(filters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      readStatus: 'all',
      startDate: '',
      endDate: ''
    });
    setAppliedFilters({
      readStatus: 'all',
      startDate: '',
      endDate: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination(prev => ({
      ...prev,
      limit: newLimit,
      page: 1
    }));
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

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteMessage(id);
      await fetchMessages();
      closeModal();
    } catch (err) {
      setError('Failed to delete message');
      console.error(err);
      throw err;
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const updatedMessage = await markMessageAsRead(id);
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, read: updatedMessage.read } : msg
      ));
    } catch (err) {
      setError('Failed to mark message as read');
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-4 bg-white dark:bg-black min-h-screen">
      <MessagesNavTable 
        title="Messages Management"
        limit={pagination.limit}
        searchTerm={searchTerm}
        onLimitChange={handleLimitChange}
        onSearchChange={(term) => setSearchTerm(term)}
        onSearchSubmit={handleSearch}
        total={pagination.total}
        filters={filters}
        onFilterChange={(name, value) => setFilters({...filters, [name]: value})}
        onFilterSubmit={handleFilter}
        onResetFilters={handleResetFilters}
      />

      <MessagesTable 
        messages={messages} 
        onDeleteClick={handleDeleteClick}
        onMarkAsRead={handleMarkAsRead}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={handlePageChange}
      />

      <DeleteModal
        show={deleteModal.show}
        id={deleteModal.id}
        name={deleteModal.name}
        itemType="message"
        onClose={closeModal}
        onConfirm={handleDeleteMessage}
      />
    </div>
  );
};

export default MessagesAdminPage;