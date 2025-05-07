import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineCancel, MdErrorOutline } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject, Project } from '../../../services/projectService';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Project>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!id) return;
        const project = await getProjectById(id);
        setValue('title', project.title);
        setValue('description', project.description || '');
        setValue('technologies', project.technologies || []);
        setValue('githubUrl', project.githubUrl || '');
        setValue('liveUrl', project.liveUrl || '');
        setValue('imageUrl', project.imageUrl || '');
        setError('');
      } catch (err) {
        setError('Failed to fetch project');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, setValue]);

  const handleUpdate = async (data: Project) => {
    try {
      setIsSubmitting(true);
      if (!id) return;
      // Convert comma-separated technologies to array
      const projectData = {
        ...data,
        technologies: Array.isArray(data.technologies)
          ? data.technologies.map(t => t.trim())
          : (data.technologies || '').split(',').map(t => t.trim())
      };
      await updateProject(id, projectData);
      toast.success('Project updated successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/admin/projects');
    } catch (err) {
      console.error('Failed to update project', err);
      toast.error('Failed to update project', {
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

  if (isLoading) {
    return <div className="text-center py-2 text-sm dark:text-gray-300">Loading project...</div>;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400 text-center py-2 text-sm">{error}</div>;
  }

  return (
    <div className="mx-auto px-6 py-2 bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-bold dark:text-white">Edit Project</h1>
        <Link
          to="/admin/projects"
          className="px-1.5 py-0.5 bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm rounded-sm flex items-center cursor-pointer transition-colors"
        >
          <IoArrowBackCircleOutline className="mr-2" /> Back
        </Link>
      </div>

      <div className="bg-white dark:bg-black">
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
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
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              {...register('description')}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Technologies (comma separated) <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register('technologies')}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              GitHub URL <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register('githubUrl', {
                validate: value => {
                  if (!value) return true;
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'GitHub URL must be valid';
                  }
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.githubUrl && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.githubUrl.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Live URL <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register('liveUrl', {
                validate: value => {
                  if (!value) return true;
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'Live URL must be valid';
                  }
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.liveUrl && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.liveUrl.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              Image URL <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register('imageUrl', {
                validate: value => {
                  if (!value) return true;
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'Image URL must be valid';
                  }
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.imageUrl && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.imageUrl.message}</p>}
          </div>

          <div className="flex space-x-1 mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-2 py-1 text-white text-sm font-semibold rounded flex items-center cursor-pointer transition-colors ${
                isSubmitting ? 'bg-indigo-400 dark:bg-indigo-500' : 'bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700'
              }`}
            >
              <BiCheckCircle className="mr-1" /> {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <Link
              to="/admin/projects"
              className="px-2 py-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold text-sm rounded flex items-center cursor-pointer transition-colors"
            >
              <MdOutlineCancel className="mr-1" /> Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;