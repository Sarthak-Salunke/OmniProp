import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { register, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !password || !confirmPassword) {
      setFormError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is already handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* CONTRACT-COMPLIANT: Using px-16 py-24 for outer spacing, flexbox for centering */}
      <div className="flex-grow flex items-center justify-center px-16 py-24 bg-estate-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* CONTRACT-COMPLIANT: p-32 card padding */}
          <div className="bg-white rounded-xl shadow-lg p-32">
            {/* Header */}
            <div className="text-center mb-32">
              {/* CONTRACT-COMPLIANT: Using p-16 for icon container */}
              <div className="inline-flex items-center justify-center p-16 bg-accent/10 rounded-full mb-16">
                <UserPlus className="w-24 h-24 text-accent" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-8">
                Create Account
              </h1>
              <p className="text-estate-muted">
                Sign up to save your property searches
              </p>
            </div>

            {/* Error Alert */}
            {(error || formError) && (
              <div className="mb-24 p-16 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{formError || error}</p>
              </div>
            )}

            {/* Form - CONTRACT-COMPLIANT: space-y-24 for vertical rhythm */}
            <form onSubmit={handleSubmit} className="space-y-24">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-estate-text mb-8">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-16 py-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

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
                  className="w-full px-16 py-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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
                  className="w-full px-16 py-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <p className="mt-8 text-xs text-estate-muted">
                  Password must be at least 6 characters
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-estate-text mb-8">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-16 py-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-12 px-24 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Register'}
              </button>

              <div className="text-center pt-8">
                <p className="text-sm text-estate-muted">
                  Already have an account?{' '}
                  <Link to="/login" className="text-accent hover:text-accent-dark font-medium transition-colors">
                    Login here
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

export default Register;