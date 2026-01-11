import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, X } from 'lucide-react';
import Button from '../ui/Button';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState('');

    const { login, register, error, loading } = useContext(AuthContext);

    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            setFormError('');
            // Reset fields
            setEmail('');
            setPassword('');
            setName('');
            setConfirmPassword('');
        }
    }, [isOpen, initialMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (mode === 'login') {
            if (!email || !password) {
                setFormError('All fields are required');
                return;
            }
            try {
                await login(email, password);
                onClose();
            } catch (err) { }
        } else {
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
                onClose();
            } catch (err) { }
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-primary-dark/60 backdrop-blur-md"
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative bg-estate-background w-full max-w-sm rounded-[2rem] shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-20"
                    >
                        <X className="w-5 h-5 text-estate-muted" />
                    </button>

                    <div className="p-6 md:p-8">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-3">
                                {mode === 'login' ? (
                                    <LogIn className="w-6 h-6 text-primary" />
                                ) : (
                                    <UserPlus className="w-6 h-6 text-primary" />
                                )}
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-primary tracking-tighter mb-1">
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-xs text-estate-muted font-medium">
                                {mode === 'login'
                                    ? 'Access your property dashboard'
                                    : 'Join our property network'}
                            </p>
                        </div>

                        {/* Error Alert */}
                        {(error || formError) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-center"
                            >
                                <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">{formError || error}</p>
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {mode === 'register' && (
                                <div>
                                    <label className="block text-[10px] font-black text-estate-text/70 ml-2 mb-1 uppercase tracking-widest">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-xs"
                                        placeholder="John Doe"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-[10px] font-black text-estate-text/70 ml-2 mb-1 uppercase tracking-widest">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-xs"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-estate-text/70 ml-2 mb-1 uppercase tracking-widest">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-xs"
                                    placeholder="••••••••"
                                />
                            </div>

                            {mode === 'register' && (
                                <div>
                                    <label className="block text-[10px] font-black text-estate-text/70 ml-2 mb-1 uppercase tracking-widest">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-xs"
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="md"
                                    className="w-full h-12 rounded-xl text-sm shadow-xl shadow-primary/20 font-black uppercase tracking-widest"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Create Account')}
                                </Button>
                            </div>

                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                    className="text-[10px] font-black text-estate-muted hover:text-primary transition-colors uppercase tracking-widest"
                                >
                                    {mode === 'login'
                                        ? "Need an account? Sign up"
                                        : "Have an account? Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
