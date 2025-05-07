import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineCancel, MdErrorOutline } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrUpdateProfile, getProfile, Profile } from '../../../services/profileService';

const EditProfile = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Profile>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        reset(profileData);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        toast.error('Failed to load profile data', {
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
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const handleUpdate = async (data: Profile) => {
    try {
      setIsSubmitting(true);
      await createOrUpdateProfile(data);
      toast.success('Profile updated successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/admin/profile');
    } catch (err) {
      console.error('Failed to update profile', err);
      toast.error('Failed to update profile', {
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
    return (
      <div className="mx-auto px-6 py-2 bg-white dark:bg-black">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-2 bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-bold dark:text-white">Edit Profile</h1>
        <Link
          to="/admin/profile"
          className="px-1.5 py-0.5 bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white flex items-center text-sm rounded cursor-pointer transition-colors"
        >
          <IoArrowBackCircleOutline className="mr-2" /> Back
        </Link>
      </div>

      <div className="bg-white dark:bg-black">
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">First Name *</label>
              <input
                {...register('firstName', { 
                  required: 'First name is required' 
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
              {errors.firstName && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Last Name *</label>
              <input
                {...register('lastName', { 
                  required: 'Last name is required' 
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
              {errors.lastName && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Profession</label>
            <input
              {...register('profession')}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Age</label>
            <input
              type="number"
              {...register('age', {
                min: {
                  value: 0,
                  message: 'Age must be a positive number'
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.age && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.age.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Bio</label>
            <textarea
              {...register('bio')}
              rows={4}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">City</label>
              <input
                {...register('location.city')}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Country</label>
              <input
                {...register('location.country')}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Avatar URL</label>
            <input
              {...register('avatar', {
                validate: value => {
                  if (!value) return true;
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'Avatar must be a valid URL';
                  }
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.avatar && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.avatar.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">GitHub URL</label>
              <input
                {...register('socialLinks.github', {
                  validate: value => {
                    if (!value) return true;
                    try {
                      new URL(value);
                      return true;
                    } catch {
                      return 'URL must be valid';
                    }
                  }
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
              {errors.socialLinks?.github && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.socialLinks.github.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">LinkedIn URL</label>
              <input
                {...register('socialLinks.linkedin', {
                  validate: value => {
                    if (!value) return true;
                    try {
                      new URL(value);
                      return true;
                    } catch {
                      return 'URL must be valid';
                    }
                  }
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
              {errors.socialLinks?.linkedin && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.socialLinks.linkedin.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Twitter URL</label>
              <input
                {...register('socialLinks.twitter', {
                  validate: value => {
                    if (!value) return true;
                    try {
                      new URL(value);
                      return true;
                    } catch {
                      return 'URL must be valid';
                    }
                  }
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
              {errors.socialLinks?.twitter && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.socialLinks.twitter.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Facebook URL</label>
              <input
                {...register('socialLinks.facebook', {
                  validate: value => {
                    if (!value) return true;
                    try {
                      new URL(value);
                      return true;
                    } catch {
                      return 'URL must be valid';
                    }
                  }
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
              {errors.socialLinks?.facebook && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.socialLinks.facebook.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Website URL</label>
            <input
              {...register('socialLinks.website', {
                validate: value => {
                  if (!value) return true;
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'URL must be valid';
                  }
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.socialLinks?.website && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.socialLinks.website.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">CV URL</label>
            <input
              {...register('cv', {
                validate: value => {
                  if (!value) return true;
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'URL must be valid';
                  }
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.cv && <p className="flex items-center text-red-500 dark:text-red-400 text-xs mt-0.5"><MdErrorOutline className='mr-1'/> {errors.cv.message}</p>}
          </div>

          <div className="flex space-x-1 mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-2 py-1 text-white text-sm font-semibold rounded flex items-center cursor-pointer transition-colors ${
                isSubmitting ? 'bg-indigo-400 dark:bg-indigo-500' : 'bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700'
              }`}
            >
              <BiCheckCircle className="mr-1" /> {isSubmitting ? 'Updating...' : 'Update'}
            </button>
            <Link
              to="/admin/profile"
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

export default EditProfile;