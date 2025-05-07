import { Link } from 'react-router-dom';
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Skill } from '../../../services/skillService';

interface SkillsTableProps {
  skills: Skill[];
  onDeleteClick: (id: string, name: string) => void;
}

const SkillsTable = ({ skills, onDeleteClick }: SkillsTableProps) => {
  return (
    <div className="bg-white">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Name</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Level</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Category</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Logo</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:text-white dark:divide-gray-700">
          {skills.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-2 py-1 text-center text-xs text-gray-500">
                No skills found
              </td>
            </tr>
          ) : (
            skills.map(skill => (
              <tr key={skill._id}>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{skill.name}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{skill.level || 'Beginner'}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{skill.category || '-'}</td>
                <td className="px-2 py-1 whitespace-nowrap">
                  {skill.logo ? (
                    <img src={skill.logo} alt={skill.name} className="h-6 w-6" />
                  ) : (
                    <span className="text-xs">-</span>
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap flex space-x-1">
                  <Link
                    to={`/admin/skills/edit/${skill._id}`}
                    className='text-gray-700 dark:text-white cursor-pointer'
                  >
                    <CiEdit />
                  </Link>
                  <button
                    onClick={() => onDeleteClick(skill._id!, skill.name)}
                    className='text-gray-700 dark:text-white cursor-pointer'
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

export default SkillsTable;