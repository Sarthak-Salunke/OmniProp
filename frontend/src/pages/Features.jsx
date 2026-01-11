import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Search, ShieldCheck, Timer, BarChart,
  Database, Globe, FileText, Lock,
  PieChart, MapPin, Building, Users
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import '@/styles/features.css';

const Features = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const features = [
    {
      icon: <Search size={40} />,
      title: "Multi-Database Search",
      description: "Search across DORIS, DLR, CERSAI, and MCA21 databases simultaneously",
      category: "core"
    },
    {
      icon: <Timer size={40} />,
      title: "Real-Time Results",
      description: "Get instant property verification results and analyses",
      category: "core"
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Verified Data",
      description: "All information is sourced from official government databases",
      category: "core"
    },
    {
      icon: <BarChart size={40} />,
      title: "Risk Analysis",
      description: "Comprehensive risk assessment of property investments",
      category: "analysis"
    },
    {
      icon: <PieChart size={40} />,
      title: "Investment Scoring",
      description: "Get detailed investment potential scores for properties",
      category: "analysis"
    },
    {
      icon: <MapPin size={40} />,
      title: "Location Intelligence",
      description: "Analyze nearby amenities and neighborhood features",
      category: "analysis"
    },
    {
      icon: <FileText size={40} />,
      title: "PDF Reports",
      description: "Generate detailed PDF reports for property verification",
      category: "tools"
    },
    {
      icon: <Database size={40} />,
      title: "Save Searches",
      description: "Save and track your property searches",
      category: "tools"
    },
    {
      icon: <Lock size={40} />,
      title: "Secure Access",
      description: "Enterprise-grade security for your sensitive data",
      category: "security"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-estate-background">
      <Navbar />

      <main className="flex-grow pt-32 md:pt-36">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="text-center text-white space-y-4">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter will-change-transform drop-shadow-2xl"
              >
                Powerful Verification Tools
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-medium leading-relaxed will-change-transform"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Discover how our comprehensive suite of features helps you make informed property decisions with confidence.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-32">
          <div className="container mx-auto px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-black text-primary tracking-tighter mb-4 uppercase italic">Core Search Engine</h2>
              <p className="text-estate-muted font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                Essential tools for comprehensive property verification
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.filter(f => f.category === "core").map((feature, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-lg md:shadow-premium hover:shadow-2xl transition-all duration-300 border border-slate-100 group gpu"
                >
                  <div className="text-accent mb-6 flex justify-center transition-transform duration-300 group-hover:scale-[1.02]">
                    {React.cloneElement(feature.icon, { size: isMobile ? 32 : 40 })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-center text-primary tracking-tight">{feature.title}</h3>
                  <p className="text-sm md:text-base text-estate-muted font-medium text-center leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Analysis Tools */}
        <section className="py-32 bg-primary/5 rounded-[5rem] mx-4 md:mx-12">
          <div className="container mx-auto px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-black text-primary tracking-tighter mb-4 uppercase italic">Advanced Analysis</h2>
              <p className="text-estate-muted font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                AI-powered analytics for better decision making
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.filter(f => f.category === "analysis").map((feature, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-lg md:shadow-premium hover:shadow-2xl transition-all duration-300 border border-slate-100 group gpu"
                >
                  <div className="text-accent mb-6 flex justify-center transition-transform duration-300 group-hover:scale-[1.02]">
                    {React.cloneElement(feature.icon, { size: isMobile ? 32 : 40 })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-center text-primary tracking-tight">{feature.title}</h3>
                  <p className="text-sm md:text-base text-estate-muted font-medium text-center leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Tools */}
        <section className="py-32">
          <div className="container mx-auto px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-black text-primary tracking-tighter mb-4 uppercase italic">Expert Toolbox</h2>
              <p className="text-estate-muted font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                Supporting features to enhance your overall experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.filter(f => f.category === "tools" || f.category === "security").map((feature, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-lg md:shadow-premium hover:shadow-2xl transition-all duration-300 border border-slate-100 group gpu"
                >
                  <div className="text-accent mb-6 flex justify-center transition-transform duration-300 group-hover:scale-[1.02]">
                    {React.cloneElement(feature.icon, { size: isMobile ? 32 : 40 })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-center text-primary tracking-tight">{feature.title}</h3>
                  <p className="text-sm md:text-base text-estate-muted font-medium text-center leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;