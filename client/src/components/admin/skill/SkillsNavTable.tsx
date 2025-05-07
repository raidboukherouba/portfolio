import { Link } from 'react-router-dom';
import { GoPlus } from "react-icons/go";

interface SkillsNavTableProps {
  title: string;
  addButtonLink: string;
  addButtonText: string;
}

const SkillsNavTable = ({ title, addButtonLink, addButtonText }: SkillsNavTableProps) => {
  return (
    <div className="flex justify-between items-center mb-4 bg-white dark:bg-black dark:text-white">
      <h1 className="text-xl font-bold">{title}</h1>
      <Link
        to={addButtonLink}
        className="px-2 py-1 bg-indigo-600 text-sm font-semibold text-white rounded-sm flex items-center cursor-pointer"
      >
        <GoPlus className="mr-1" /> {addButtonText}
      </Link>
    </div>
  );
};

export default SkillsNavTable;