import { Link } from 'react-router-dom';
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Certification } from '../../../services/certificationService';

interface CertificationsTableProps {
  certifications: Certification[];
  onDeleteClick: (id: string, title: string) => void;
}

const CertificationsTable = ({ certifications, onDeleteClick }: CertificationsTableProps) => {
  return (
    <div className="bg-white dark:bg-black">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Title</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Issuer</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Date</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Credential</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-gray-700">
          {certifications.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-2 py-1 text-center text-xs text-gray-500 dark:text-gray-400">
                No certifications found
              </td>
            </tr>
          ) : (
            certifications.map(certification => (
              <tr key={certification._id} className="dark:text-white">
                <td className="px-2 py-1 whitespace-nowrap text-xs">{certification.title}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{certification.issuer || '-'}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">
                  {certification.date ? new Date(certification.date).toLocaleDateString() : '-'}
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  {certification.credentialUrl ? (
                    <a 
                      href={certification.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-xs">-</span>
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap flex space-x-1">
                  <Link
                    to={`/admin/certifications/edit/${certification._id}`}
                    className='text-gray-700 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400'
                  >
                    <CiEdit />
                  </Link>
                  <button
                    onClick={() => onDeleteClick(certification._id!, certification.title)}
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

export default CertificationsTable;