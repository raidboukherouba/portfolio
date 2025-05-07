import { Link } from 'react-router-dom';
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Diploma } from '../../../services/diplomaService';

interface DiplomasTableProps {
  diplomas: Diploma[];
  onDeleteClick: (id: string, title: string) => void;
}

const DiplomasTable = ({ diplomas, onDeleteClick }: DiplomasTableProps) => {
  return (
    <div className="bg-white dark:bg-black">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Title</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Institution</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Field</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Date</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-gray-700">
          {diplomas.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-2 py-1 text-center text-xs text-gray-500 dark:text-gray-400">
                No diplomas found
              </td>
            </tr>
          ) : (
            diplomas.map(diploma => (
              <tr key={diploma._id} className="dark:text-white">
                <td className="px-2 py-1 whitespace-nowrap text-xs">{diploma.title}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{diploma.institution || '-'}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{diploma.field || '-'}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">
                  {diploma.date ? new Date(diploma.date).toLocaleDateString() : '-'}
                </td>
                <td className="px-2 py-1 whitespace-nowrap flex space-x-1">
                  <Link
                    to={`/admin/diplomas/edit/${diploma._id}`}
                    className='text-gray-700 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400'
                  >
                    <CiEdit />
                  </Link>
                  <button
                    onClick={() => onDeleteClick(diploma._id!, diploma.title)}
                    className='text-gray-700 dark:text-white cursor-pointer hover:text-red-600 dark:hover:text-red-400'
                  >
                    <IoTrashBinOutline />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiplomasTable;