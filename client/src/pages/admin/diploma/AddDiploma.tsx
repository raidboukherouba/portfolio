import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineCancel, MdErrorOutline } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { createDiploma, Diploma } from '../../../services/diplomaService';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDiploma = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Diploma>();

  const handleCreate = async (data: Diploma) => {
    try {
      setIsSubmitting(true);
      await createDiploma(data);
      toast.success('Diploma created successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/admin/diplomas');
    } catch (err) {
      console.error('Failed to create diploma', err);
      toast.error('Failed to create diploma', {
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
        <h1 className="text-lg font-bold dark:text-white">Add New Diploma</h1>
        <Link
          to="/admin/diplomas"
          className="px-1.5 py-0.5 bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white flex items-center text-sm rounded cursor-pointer transition-colors"
        >
          <IoArrowBackCircleOutline className="mr-2" /> Back
        </Link>
      </div>

      <div className="bg-white dark:bg-black">
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Title *</label>
            <input
              {...register('title', { 
                required: 'Title is required' 
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.title && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Institution <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register('institution')}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Field of Study <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register('field')}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Date *</label>
            <input
              type="date"
              {...register('date', { 
                required: 'Date is required',
                valueAsDate: true
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.date && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.date.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              {...register('description')}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              rows={3}
            />
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
              to="/admin/diplomas"
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

export default AddDiploma;