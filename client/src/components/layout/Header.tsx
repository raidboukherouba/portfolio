import { useState } from 'react';
import { FiMoon, FiSun, FiLogIn, FiLogOut } from 'react-icons/fi';
import { NavLink, Link, useNavigate } from "react-router-dom"

type HeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
};

export default function Header({ darkMode, toggleDarkMode, isAuthenticated, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      onLogout();
      navigate('/');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-black sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">Portfolio</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {!isAuthenticated ? (
              <>
                <NavLink 
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/resume" 
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Resume
                </NavLink>
                <NavLink 
                  to="/skills"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Skills
                </NavLink>
                <NavLink 
                  to="/projects"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Projects
                </NavLink>
                <NavLink 
                  to="/contact-us"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Contact Us
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to="/admin/skills"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Skills
                </NavLink>
                <NavLink 
                  to="/admin/projects"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Projects
                </NavLink>
                <NavLink 
                  to="/admin/diplomas"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Diplomas
                </NavLink>
                <NavLink 
                  to="/admin/certifications"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Certifications
                </NavLink>
                <NavLink 
                  to="/admin/profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Profile
                </NavLink>
                <NavLink 
                  to="/admin/messages"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive ? "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-gray-800" 
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
                  }
                >
                  Messages
                </NavLink>
              </>
            )}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {/* Desktop Auth Button */}
            <button
              onClick={handleAuthAction}
              className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition cursor-pointer"
            >
              {isAuthenticated ? (
                <>
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </>
              ) : (
                <>
                  <FiLogIn size={16} />
                  <span>Login</span>
                </>
              )}
            </button>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-2 pb-4 transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col items-center space-y-2 px-2">
            {!isAuthenticated ? (
              <>
                <NavLink 
                  to="/" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/resume" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Resume
                </NavLink>
                <NavLink 
                  to="/skills" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Skills
                </NavLink>
                <NavLink 
                  to="/projects" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Projects
                </NavLink>
                <NavLink 
                  to="/contact-us" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Contact Us
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to="/admin/skills" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Skills
                </NavLink>
                <NavLink 
                  to="/admin/projects" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Projects
                </NavLink>
                <NavLink 
                  to="/admin/diplomas" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Diplomas
                </NavLink>
                <NavLink 
                  to="/admin/certifications" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Certifications
                </NavLink>
                <NavLink 
                  to="/admin/profile" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Profile
                </NavLink>
                <NavLink 
                  to="/admin/messages" 
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  onClick={toggleMenu}
                >
                  Messages
                </NavLink>
              </>
            )}

            {/* Mobile Auth Button - Centered */}
            <button
              onClick={handleAuthAction}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
            >
              {isAuthenticated ? (
                <>
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </>
              ) : (
                <>
                  <FiLogIn size={16} />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}