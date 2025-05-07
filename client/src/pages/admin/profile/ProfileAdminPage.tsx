import { useState, useEffect } from 'react';
import { getProfile, Profile } from '../../../services/profileService';
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import ProfileSection from '../../../components/sections/profile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileAdminPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getProfile();
      setProfile(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch profile');
      console.error(err);
      toast.error('Failed to load profile', {
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

  if (isLoading) {
    return (
      <div className="mx-auto px-6 py-4 bg-white dark:bg-black">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-6 py-4 bg-white dark:bg-black">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-sm font-medium rounded flex items-center cursor-pointer transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-4 bg-white dark:bg-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold dark:text-white">Profile Management</h1>
        {profile ? (
          <Link
            to="/admin/profile/edit"
            className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-sm font-medium rounded flex items-center cursor-pointer transition-colors"
          >
            <MdOutlineEdit className="mr-2" /> Edit Profile
          </Link>
        ) : (
          <Link
            to="/admin/profile/add"
            className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-sm font-medium rounded flex items-center cursor-pointer transition-colors"
          >
            <IoAddCircleOutline className="mr-2" /> Create Profile
          </Link>
        )}
      </div>

      {profile ? (
        <div className="bg-white dark:bg-black">
          <ProfileSection />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No profile found</p>
          <Link
            to="/admin/profile/manage"
            className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-sm font-medium rounded flex items-center cursor-pointer transition-colors"
          >
            <IoAddCircleOutline className="mr-2" /> Create Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileAdminPage;