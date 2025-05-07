import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineCancel, MdErrorOutline } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { createSkill, Skill } from '../../../services/skillService';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSkill = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Skill>({
    defaultValues: {
      level: 'Beginner'
    }
  });

  const handleCreate = async (data: Skill) => {
    try {
      setIsSubmitting(true);
      await createSkill(data);
      toast.success('Skill created successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/admin/skills');
    } catch (err) {
      console.error('Failed to create skill', err);
      toast.error('Failed to create skill', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto px-6 py-2 bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-bold dark:text-white">Add New Skill</h1>
        <Link
          to="/admin/skills"
          className="px-1.5 py-0.5 bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white flex items-center text-sm rounded cursor-pointer transition-colors"
        >
          <IoArrowBackCircleOutline className="mr-2" /> Back
        </Link>
      </div>

      <div className="bg-white dark:bg-black">
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Name *</label>
            <input
              {...register('name', { 
                required: 'Skill name is required' 
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.name && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Level <span className="text-gray-400">(optional)</span>
            </label>
            <select
              {...register('level', {
                validate: value => 
                  !value || ['Beginner', 'Intermediate', 'Advanced'].includes(value) || 
                  'Level must be Beginner, Intermediate, or Advanced'
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.level && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"> <MdErrorOutline className='mr-1'/> {errors.level.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Category <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register('category', {
                validate: value => 
                  !value || typeof value === 'string' || 
                  'Category must be a string'
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.category && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"> <MdErrorOutline className='mr-1'/> {errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Logo URL <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register('logo', {
                validate: value => {
                  if (!value) return true;
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'Logo must be a valid URL';
                  }
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.logo && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"> <MdErrorOutline className='mr-1'/> {errors.logo.message}</p>}
          </div>

          <div className="flex space-x-1 mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-2 py-1 text-white text-sm font-semibold rounded flex items-center cursor-pointer transition-colors ${
                isSubmitting ? 'bg-indigo-400 dark:bg-indigo-500' : 'bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700'
              }`}
            >
              <BiCheckCircle className="mr-1" /> {isSubmitting ? 'Adding...' : 'Add'}
            </button>
            <Link
              to="/admin/skills"
              className="px-2 py-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm font-semibold rounded flex items-center cursor-pointer transition-colors"
            >
              <MdOutlineCancel className="mr-1" /> Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;