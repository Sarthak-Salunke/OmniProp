import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import PropertySearchForm from './pages/PropertySearch/PropertySearchForm';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './components/ui/Toast';
import './i18n'; // Import i18n configuration
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap-override.css'; // Override Bootstrap colors with our theme

const App = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/search" element={<PropertySearchForm />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
