import { Link } from 'react-router-dom';
import { GoPencil } from "react-icons/go";

interface NavProfilePreviewProps {
  title: string;
  addButtonLink: string;
  addButtonText: string;
}

const NavProfilePreview = ({ title, addButtonLink, addButtonText }: NavProfilePreviewProps) => {
  return (
    <div className="flex justify-between items-center mb-4 bg-white dark:bg-black dark:text-white">
      <h1 className="text-xl font-bold">{title}</h1>
      <Link
        to={addButtonLink}
        className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-sm font-semibold text-white rounded-sm flex items-center cursor-pointer transition-colors"
      >
        <GoPencil className="mr-1" /> {addButtonText}
      </Link>
    </div>
  );
};

export default NavProfilePreview;