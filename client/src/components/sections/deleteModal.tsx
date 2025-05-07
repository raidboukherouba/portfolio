import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DeleteModalProps {
  show: boolean;
  id: string;
  name: string;
  itemType?: string; // Optional - makes it more reusable for different item types
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

const DeleteModal = ({ show, id, name, itemType = 'item', onClose, onConfirm }: DeleteModalProps) => {
  if (!show) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm(id);
      toast.success(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      toast.error(`Failed to delete ${itemType}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 dark:bg-black/30 backdrop-blur-sm shadow-lg flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Confirm Delete</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Are you sure you want to delete the {itemType} "{name}"?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 dark:hover:bg-red-800 cursor-pointer transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;