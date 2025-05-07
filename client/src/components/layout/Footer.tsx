import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Name + Image */}
        <div className="flex text-center justify-center space-x-3">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-gray-700"
          />
          <h2 className="font-bold text-lg text-gray-800 dark:text-white">Raid Boukherouba</h2>
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

        {/* Social Links */}
        <div className="flex justify-center mt-4 space-x-6">
          <a 
            href="https://twitter.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <FaTwitter size={18} />
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <FaLinkedin size={18} />
          </a>
          <a 
            href="https://github.com/raidboukherouba" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}