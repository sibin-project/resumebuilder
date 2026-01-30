import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import Navbar from "./components/Navbar";
import AuthPage from "./pages/Authpage";
import Dashboard from "./pages/Dashboard";

import ChatSupport from "./pages/ChatSupport";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Features from "./pages/Features";
import Templates from "./pages/Templates";
import Examples from "./pages/Examples";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminContacts from "./pages/admin/Contacts";
import AdminBlog from "./pages/admin/BlogManager";
import AdminTemplates from "./pages/admin/TemplateManager";
import { useAuth } from "./context/AuthContext";
import BuilderLayout from './layouts/BuilderLayout';
import PersonalDetails from './pages/builder/PersonalDetails';
import Summary from './pages/builder/Summary';
import Experience from './pages/builder/Experience';
import Education from './pages/builder/Education';
import Skills from './pages/builder/Skills';
import Projects from './pages/builder/Projects';
import TemplateSelection from './pages/builder/TemplateSelection';
import Finish from './pages/builder/Finish';

export default function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Hide Navbar on admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      {/* <main className="flex-grow py-8 page-container"> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />


        {/* New Structure: Builder Wizard */}
        <Route path="/builder/:id" element={<ProtectedRoute><BuilderLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="templates" replace />} />
          <Route path="templates" element={<TemplateSelection />} />
          <Route path="personal" element={<PersonalDetails />} />
          <Route path="summary" element={<Summary />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="finish" element={<Finish />} />
        </Route>

        {/* Legacy Redirect - Handle old /builder?id=xyz links if possible, or just default */}
        <Route path="/builder" element={<Navigate to={`/builder/${Date.now()}`} replace />} />

        <Route path="/chat" element={<ProtectedRoute><ChatSupport /></ProtectedRoute>} />

        {/* Public Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="templates" element={<AdminTemplates />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* </main> */}
      <Footer></Footer>
    </div>
  );
}
