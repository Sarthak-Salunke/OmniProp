import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import AuthModal from './Auth/AuthModal';

const Navbar = ({ onNavigateHome, onNavigateAbout }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'hi' : 'en');
  };

  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const isHome = window.location.hash === '' || window.location.hash === '#/' || window.location.hash === '#' || window.location.hash.startsWith('#/about') || window.location.hash.startsWith('#/features');

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false);
    if (link.path === '/about') {
      if (onNavigateAbout) {
        onNavigateAbout();
        window.location.hash = '/about';
      } else {
        navigate('/about');
      }
      return;
    }

    if (link.isScene) {
      if (isHome) {
        window.location.hash = link.path;
      } else {
        navigate(link.path);
      }
    } else if (link.isHome) {
      if (isHome) {
        onNavigateHome?.();
        window.location.hash = '';
      } else {
        navigate('/');
      }
    } else {
      navigate(link.path);
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-7xl gpu">
        <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-primary/10 rounded-full px-8 md:px-12 py-3 ring-1 ring-black/5 gpu">
          <div className="flex items-center justify-between">
            {/* Logo and Name */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => handleNavClick({ isHome: true })}
            >
              <img
                src={`${import.meta.env.BASE_URL}logo-navbar.png`}
                alt="Omniprop Logo"
                className="h-12 w-12 mr-4 transition-[transform] duration-300 group-hover:rotate-12 will-change-transform"
              />
              <span className="font-bold text-2xl tracking-tighter text-primary">OMNIPROP</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              <div className="flex items-center gap-6">
                {[
                  { name: t('navbar.home'), path: '/', isHome: true },
                  { name: t('navbar.search'), path: '/search' },
                  { name: t('navbar.features'), path: '/features', isScene: true },
                  { name: 'About', path: '/about', isScene: true }
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => handleNavClick(link)}
                    className="text-estate-text/80 hover:text-primary font-semibold transition-[color] duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full whitespace-nowrap"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={toggleLanguage}
                  variant="outline"
                  size="sm"
                  className="hover:scale-105"
                >
                  {t('common.changeLang')}
                </Button>

                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-estate-text font-bold text-sm">
                      {user.name.split(' ')[0]}
                    </span>
                    <Button
                      onClick={logout}
                      variant="primary"
                      size="sm"
                    >
                      {t('navbar.logout')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => openAuthModal('login')}
                      variant="ghost"
                      size="sm"
                    >
                      {t('navbar.login')}
                    </Button>
                    <Button
                      onClick={() => openAuthModal('register')}
                      variant="primary"
                      size="sm"
                    >
                      {t('navbar.signup')}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="p-3 bg-primary/5 rounded-full text-primary hover:bg-primary/10 transition-colors"
                aria-label="Toggle Language"
              >
                <Globe className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 bg-primary/5 rounded-full text-primary hover:bg-primary/10 transition-colors z-[10001]"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 w-[95%] bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-primary/10 flex flex-col gap-6 gpu"
            >
              {[
                { name: t('navbar.home'), path: '/', isHome: true },
                { name: t('navbar.search'), path: '/search' },
                { name: t('navbar.features'), path: '/features', isScene: true },
                { name: 'About', path: '/about', isScene: true }
              ].map((link, i) => (
                <button
                  key={i}
                  onClick={() => handleNavClick(link)}
                  className="text-estate-text/80 hover:text-primary font-black text-2xl tracking-tighter text-left"
                >
                  {link.name}
                </button>
              ))}
              <div className="h-[1px] bg-slate-100 my-2"></div>
              <div className="flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="text-estate-text font-black text-lg px-2">
                      {t('navbar.welcome')}, {user.name}
                    </div>
                    <Button onClick={logout} variant="primary" size="lg" className="h-14 rounded-2xl">
                      {t('navbar.logout')}
                    </Button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => openAuthModal('login')} variant="ghost" size="lg" className="h-14 rounded-2xl">
                      {t('navbar.login')}
                    </Button>
                    <Button onClick={() => openAuthModal('register')} variant="primary" size="lg" className="h-14 rounded-2xl">
                      {t('navbar.signup')}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav >

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
};

export default Navbar;