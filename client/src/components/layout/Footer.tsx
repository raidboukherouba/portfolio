import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { getProfile } from "../../services/profileService"; // adjust path if needed

export default function Footer() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  if (!profile) return null;

  return (
    <footer className="mt-auto bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

        {/* Name + Dynamic Avatar */}
        <div className="flex text-center justify-center space-x-3">
          <img
            alt={`${profile.firstName} ${profile.lastName}`}
            src={profile.avatar || '/default-avatar.png'}
            className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-gray-700 object-cover"
          />
          <h2 className="font-bold text-lg text-gray-800 dark:text-white">
            {profile.firstName} {profile.lastName}
          </h2>
        </div>

        {/* NavBar */}
        <nav className="flex items-center justify-center space-x-6 mt-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link to="/resume" className="hover:text-blue-600 dark:hover:text-blue-400">Resume</Link>
          <Link to="/skills" className="hover:text-blue-600 dark:hover:text-blue-400">Skills</Link>
          <Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-400">Projects</Link>
          <Link to="/contact-us" className="hover:text-blue-600 dark:hover:text-blue-400">Contact Us</Link>
        </nav>

        <hr className="min-w-[350px] w-1/3 mt-4 mx-auto border-gray-300 dark:border-gray-600"/>

        {/* Copyright */}
        <div className="text-center mt-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} <span className="font-semibold dark:text-gray-300">Portfolio template</span>. All rights reserved.
          </p>
        </div>

        {/* Dynamic Social Links */}
        <div className="flex justify-center mt-4 space-x-6">
          {profile.socialLinks?.twitter && (
            <a 
              href={profile.socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <FaTwitter size={18} />
            </a>
          )}
          {profile.socialLinks?.linkedin && (
            <a 
              href={profile.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <FaLinkedin size={18} />
            </a>
          )}
          {profile.socialLinks?.github && (
            <a 
              href={profile.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <FaGithub size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
