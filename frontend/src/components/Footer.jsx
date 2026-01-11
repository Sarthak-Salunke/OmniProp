import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/50 backdrop-blur-sm py-8 text-center border-t border-slate-100/50 rounded-t-[3rem]">
      <div className="container mx-auto px-8 space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo-navbar.png`} className="w-8 h-8" alt="Logo" />
            <span className="text-xl font-black tracking-tighter text-primary">OMNIPROP</span>
          </div>
          <p className="text-estate-muted font-medium text-sm max-w-md">
            {t('home.footer.tagline') || 'The next generation of property search and verification.'}
          </p>
        </div>
        <div className="pt-4 border-t border-slate-100/50 flex flex-col md:flex-row justify-between items-center gap-4 text-estate-muted font-bold text-[10px] uppercase tracking-wider">
          <span>&copy; {currentYear} OmniProp. {t('common.rights') || 'All rights reserved.'}</span>
          <div className="flex flex-row gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="text-primary font-black">Contact:</span>
              <a href="mailto:sarthakbs2004@gmail.com" className="hover:text-primary transition-colors lowercase">
                sarthakbs2004@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-black">Social:</span>
              <a
                href="https://www.linkedin.com/in/sarthak-salunke-99ab55259/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;