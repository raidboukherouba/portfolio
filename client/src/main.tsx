import { useState, useEffect } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Navigate,
  Outlet
} from 'react-router-dom';
import NotFoundPage from './pages/NotFound.js';
import HomePage from './pages/Home.js';
import SkillPage from './pages/Skills.js';
import ProjectsPage from './pages/Projects.js';
import ResumePage from './pages/Resume.js';
import ContactPage from './pages/Contact.js';
import SkillsList from './pages/admin/skill/SkillsAdminPage.js';
import AddSkill from './pages/admin/skill/AddSkill.js';
import EditSkill from './pages/admin/skill/EditSkill.js';
import CertificationsAdminPage from './pages/admin/certfication/CertificationsAdminPage.js';
import AddCertification from './pages/admin/certfication/AddCertification.js';
import EditCertification from './pages/admin/certfication/EditCertification.js';
import DiplomasAdminPage from './pages/admin/diploma/DiplomasAdminPage.js';
import AddDiploma from './pages/admin/diploma/AddDiploma.js';
import EditDiploma from './pages/admin/diploma/EditDiploma.js';
import ProjectsAdminPage from './pages/admin/project/ProjectsAdminPage.js'; 
import AddProject from './pages/admin/project/AddProject.js';
import EditProject from './pages/admin/project/EditProject.js';
import ProfileAdminPage from './pages/admin/profile/ProfileAdminPage.js';
import AddProfile from './pages/admin/profile/AddProfile.js';
import EditProfile from './pages/admin/profile/EditProfile.js';
import MessagesAdminPage from './pages/admin/message/MessagesAdminPage.js';
import Login from './pages/Login.js';
import { isAuthenticated, refreshAccessToken } from './services/authService';
import ForgotPassword from './pages/ForgotPassword.js'
import ResetPassword from './pages/ResetPassword.js'

// Enhanced auth check with token refresh attempt
const checkAuth = async () => {
  try {
    if (isAuthenticated()) return true;
    
    // Attempt to refresh token if access token is expired but refresh token exists
    const refreshed = await refreshAccessToken().catch(() => false);
    return !!refreshed;
  } catch (error) {
    return false;
  }
};

// Admin Layout component with proper authentication handling
const AdminLayout = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const authenticated = await checkAuth();
      setIsAuth(authenticated);
      setAuthChecked(true);
    };
    verifyAuth();
  }, []);

  if (!authChecked) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuth) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <Outlet />;
};

// Public Layout for routes that should be accessible only when not authenticated
const PublicLayout = () => {
  if (isAuthenticated()) {
    return <Navigate to="/admin/skills" replace />;
  }
  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <> 
      <Route path="/" element={<App/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/skills" element={<SkillPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        
        {/* Public routes (only accessible when not authenticated) */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/skills" element={<SkillsList />} />
          <Route path="/admin/skills/add" element={<AddSkill />} />
          <Route path="/admin/skills/edit/:id" element={<EditSkill />} />

          <Route path="/admin/certifications" element={<CertificationsAdminPage />} />
          <Route path="/admin/certifications/add" element={<AddCertification />} />
          <Route path="/admin/certifications/edit/:id" element={<EditCertification />} />

          <Route path="/admin/diplomas" element={<DiplomasAdminPage />} />
          <Route path="/admin/diplomas/add" element={<AddDiploma />} />
          <Route path="/admin/diplomas/edit/:id" element={<EditDiploma />} />

          <Route path="/admin/projects" element={<ProjectsAdminPage />} />
          <Route path="/admin/projects/add" element={<AddProject />} />
          <Route path="/admin/projects/edit/:id" element={<EditProject />} />

          <Route path="/admin/profile" element={<ProfileAdminPage />} />
          <Route path="/admin/profile/add" element={<AddProfile />} />
          <Route path="/admin/profile/edit" element={<EditProfile />} />

          <Route path="/admin/messages" element={<MessagesAdminPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />  
      </Route> 
    </>
  )
);  

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);