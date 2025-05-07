import { useEffect, useState } from 'react';
import { getProfile } from '../../services/profileService';
import { MdOutlineFileDownload } from "react-icons/md";

export default function ProfileSection() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (!profile) return <div className='text-center bg-gray-50 dark:bg-black pt-4 dark:text-gray-300'>No profile data found</div>;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden">
          {/* Profile Header */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img 
                  src={profile.avatar || '/default-avatar.png'} 
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/50 dark:border-gray-800/50 object-cover shadow-lg"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {profile.firstName} {profile.lastName}
                </h1>
                {profile.profession && (
                  <p className="text-lg sm:text-xl mt-1 text-gray-700 dark:text-gray-300">
                    {profile.profession}
                  </p>
                )}
                {profile.location && (
                  <div className="flex items-center justify-center sm:justify-start mt-2 text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {profile.location.city}, {profile.location.country}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Body */}
          <div className="p-6 md:p-8">
            {profile.bio && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">About Me</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg text-justify leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Social Links */}
            {(profile.socialLinks?.github || 
              profile.socialLinks?.linkedin || 
              profile.socialLinks?.twitter) && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Connect With Me</h2>
                <div className="flex flex-wrap gap-3">
                  {profile.socialLinks.github && (
                    <a 
                      href={profile.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-semibold gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-lg transition text-gray-800 dark:text-gray-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {profile.socialLinks.linkedin && (
                    <a 
                      href={profile.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-semibold gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-lg transition text-gray-800 dark:text-gray-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {profile.socialLinks.twitter && (
                    <a 
                      href={profile.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-semibold gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-lg transition text-gray-800 dark:text-gray-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}

            {profile.cv && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">My CV</h2>
                <a
                  href={profile.cv}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-white bg-indigo-400 dark:bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 text-sm font-semibold px-3 py-2 rounded transition-colors"
                >
                  <MdOutlineFileDownload size={20} className='mr-2'/>
                  Download CV
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}