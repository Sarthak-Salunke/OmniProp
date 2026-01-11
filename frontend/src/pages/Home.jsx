import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutProject from '@/components/AboutProject';
import Button from '@/components/ui/Button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Timer, BarChart, Building, Database, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const Home = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [currentScene, setCurrentScene] = useState(0);

  // Scenes list for narrative flow
  const scenes = [
    { name: 'Introduction', subtitle: 'The Future of Real Estate' },
    { name: 'Capabilities', subtitle: 'Our Advanced Features' },
    { name: 'Data Intelligence', subtitle: 'Real-Time Insights' },
    { name: 'About', subtitle: 'The OmniProp Story' },
    { name: 'Get Started', subtitle: 'Join the Ecosystem' }
  ];

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
    }
  };

  const goToScene = (index) => {
    if (index >= 0 && index < scenes.length) {
      setCurrentScene(index);
    }
  };

  // Sync with Navbar or external navigation if needed
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash === 'features') goToScene(1);
      if (hash === 'metrics' || hash === 'stats') goToScene(2);
      if (hash === 'vision' || hash === 'about') goToScene(3);
      if (hash === 'cta' || hash === 'start') goToScene(4);
      if (hash === '') goToScene(0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global click-to-advance handler
  const handleGlobalClick = (e) => {
    // Check if the click was on an interactive element
    const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
    const isInteractive = interactiveTags.includes(e.target.tagName) ||
      e.target.closest('button') ||
      e.target.closest('a') ||
      e.target.closest('.no-advance');

    if (!isInteractive) {
      if (currentScene < scenes.length - 1) {
        nextScene();
      } else {
        goToScene(0);
      }
    }
  };

  // Shared performance-optimized variants
  const sceneAnimation = {
    initial: { opacity: 0, y: isMobile ? 10 : 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: isMobile ? -10 : -20 },
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1] // Premium ease-out-quint
    }
  };

  const features = [
    {
      icon: <Search size={40} />,
      titleKey: "home.features.comprehensiveSearch.title",
      descriptionKey: "home.features.comprehensiveSearch.description",
    },
    {
      icon: <ShieldCheck size={40} />,
      titleKey: "home.features.secureReliable.title",
      descriptionKey: "home.features.secureReliable.description",
    },
    {
      icon: <Timer size={40} />,
      titleKey: "home.features.fastResults.title",
      descriptionKey: "home.features.fastResults.description",
    },
    {
      icon: <BarChart size={40} />,
      titleKey: "home.features.detailedAnalytics.title",
      descriptionKey: "home.features.detailedAnalytics.description",
    },
  ];

  const stats = [
    {
      icon: <Building size={32} />,
      value: "1M+",
      labelKey: "home.stats.properties",
    },
    {
      icon: <Database size={32} />,
      value: "4+",
      labelKey: "home.stats.databases",
    },
    {
      icon: <Globe size={32} />,
      value: "1+",
      labelKey: "home.stats.countries",
    },
  ];

  return (
    <div
      className="h-screen w-full overflow-hidden flex flex-col bg-estate-background text-estate-text relative selection:bg-primary selection:text-white cursor-pointer"
      onClick={handleGlobalClick}
    >
      {/* Narrative Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[10000] bg-slate-100/50">
        <motion.div
          className="h-full bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentScene + 1) / scenes.length }}
          transition={{ duration: 0.4, ease: "circOut" }}
          style={{ willChange: "transform" }}
        />
      </div>

      <Navbar onNavigateHome={() => goToScene(0)} onNavigateAbout={() => goToScene(3)} />

      <main className="flex-grow relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {currentScene === 0 && (
            <motion.section
              key="hero"
              {...sceneAnimation}
              className="min-h-screen w-full flex items-center justify-center relative px-6 md:px-8 pt-24"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={`${import.meta.env.BASE_URL}hero-bg.png`}
                  alt="Background"
                  className="w-full h-full object-cover transform scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95 backdrop-blur-[1px]"></div>
              </div>

              <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
                <motion.h1
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter shadow-sm"
                >
                  {t('home.hero.title')}
                </motion.h1>

                <motion.p
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium"
                >
                  {t('home.hero.description')}
                </motion.p>

                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
                >
                  <Button
                    onClick={() => navigate('/search')}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto px-10 h-14 md:h-16 text-lg rounded-2xl md:rounded-full"
                  >
                    {t('home.hero.getStarted')}
                  </Button>
                  <Button
                    onClick={nextScene}
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-10 h-14 md:h-16 text-lg border-2 border-white/80 text-white hover:bg-white hover:text-primary transition-all duration-300 font-bold rounded-2xl md:rounded-full"
                  >
                    {t('home.features.title')}
                  </Button>
                </motion.div>

                {/* Inline hint for landing page */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="pt-2"
                >
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
                    <span className="text-white/70 text-[8px] font-medium uppercase tracking-[0.4em] whitespace-nowrap">
                      Click Anywhere to Continue
                    </span>
                  </div>
                </motion.div>
              </div>


            </motion.section>
          )}

          {currentScene === 1 && (
            <motion.section
              key="features"
              {...sceneAnimation}
              className="min-h-screen w-full flex items-center justify-center px-6 md:px-8 bg-slate-50 relative overflow-hidden pt-24 pb-20"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="text-center mb-12 space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black text-estate-text tracking-tighter uppercase">Our Capabilities</h2>
                  <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center space-y-3 md:space-y-4 gpu"
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-primary/5 flex items-center justify-center text-primary">
                        {React.cloneElement(feature.icon, { size: isMobile ? 24 : 28 })}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-estate-text tracking-tight">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-xs md:text-sm text-estate-muted leading-relaxed font-medium">
                        {t(feature.descriptionKey)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {currentScene === 2 && (
            <motion.section
              key="metrics"
              {...sceneAnimation}
              className="min-h-screen w-full flex items-center justify-center px-6 md:px-8 bg-white relative overflow-hidden pt-24 pb-20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.03),transparent)]"></div>
              <div className="max-w-6xl mx-auto w-full text-center space-y-12 relative z-10">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black text-estate-text tracking-tighter">Real-Time Platform Metrics</h2>
                  <p className="text-lg text-estate-muted font-medium">Powering the future of Indian real estate with massive data intelligence.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center bg-estate-background rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 shadow-premium border border-slate-100 gpu">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center text-center space-y-1 md:space-y-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="text-primary/10">
                        {React.cloneElement(stat.icon, { size: isMobile ? 36 : 48 })}
                      </div>
                      <div className="text-4xl md:text-7xl font-black text-primary tracking-tighter">
                        {stat.value}
                      </div>
                      <div className="text-sm md:text-lg font-bold text-estate-text/60 uppercase tracking-widest">
                        {t(stat.labelKey)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {currentScene === 3 && (
            <motion.section
              key="vision"
              {...sceneAnimation}
              className="min-h-screen w-full flex items-center justify-center px-6 md:px-8 bg-slate-50 relative overflow-hidden pt-36 pb-36"
            >
              <div className="max-w-7xl mx-auto w-full relative z-10">
                <AboutProject />
              </div>
            </motion.section>
          )}

          {currentScene === 4 && (
            <motion.section
              key="cta"
              {...sceneAnimation}
              className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-8 bg-estate-background relative pt-20 pb-12"
            >
              <div className="max-w-6xl mx-auto w-full bg-primary-dark rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent pointer-events-none"></div>
                <div className="relative z-10 space-y-6">
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                    {t('home.cta.title')}
                  </h2>
                  <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
                    {t('home.cta.description')}
                  </p>
                  <div className="pt-4">
                    <Button
                      onClick={() => navigate('/search')}
                      variant="secondary"
                      size="lg"
                      className="h-16 px-12 text-xl rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                    >
                      {t('home.cta.button')}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-8 w-full max-w-6xl">
                <Footer />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>


      {/* Narrative Controls (Floating Dots) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4">
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goToScene(i);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${currentScene === i
              ? 'bg-primary h-8 shadow-[0_0_10px_theme(colors.primary.DEFAULT)]'
              : 'bg-primary/20 hover:bg-primary/40'
              }`}
            title={`Go to ${scenes[i].name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
