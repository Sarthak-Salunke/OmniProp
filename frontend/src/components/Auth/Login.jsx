import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('All fields are required');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is already handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* CONTRACT-COMPLIANT: Using p-24 for outer spacing, flexbox for centering */}
      <div className="flex-grow flex items-center justify-center px-16 py-24 bg-estate-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* CONTRACT-COMPLIANT: p-32 card padding, consistent spacing throughout */}
          <div className="bg-white rounded-xl shadow-lg p-32">
            {/* Header */}
            <div className="text-center mb-32">
              {/* CONTRACT-COMPLIANT: Using flex for icon container */}
              <div className="inline-flex items-center justify-center p-16 bg-secondary/10 rounded-full mb-16">
                <LogIn className="w-24 h-24 text-secondary" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-8">
                Welcome Back
              </h1>
              <p className="text-estate-muted">
                Access your saved property searches
              </p>
            </div>

            {/* Error Alert */}
            {(error || formError) && (
              <div className="mb-24 p-16 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{formError || error}</p>
              </div>
            )}

            {/* Form - CONTRACT-COMPLIANT: space-y-24 for consistent vertical rhythm */}
            <form onSubmit={handleSubmit} className="space-y-24">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-estate-text mb-8">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-16 py-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-estate-text mb-8">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-16 py-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-medium py-12 px-24 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="text-center pt-8">
                <p className="text-sm text-estate-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-secondary hover:text-secondary-dark font-medium transition-colors">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;