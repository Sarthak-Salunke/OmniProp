import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Code2, Globe2, Lightbulb } from 'lucide-react';

const AboutProject = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="about" className="py-4 relative overflow-hidden flex items-center">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
            <div className={`absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2 pointer-events-none ${shouldReduceMotion ? 'hidden' : ''}`}></div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Visual Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <motion.div
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 15 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.4 }}
                            className="relative gpu"
                        >
                            <div className="bg-white p-3 rounded-[2rem] shadow-premium relative z-10 overflow-hidden">
                                <img
                                    src={`${import.meta.env.BASE_URL}hero-bg.png`}
                                    alt="Project Vision"
                                    className="rounded-[1.5rem] w-full aspect-square md:aspect-video lg:h-[400px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                            <Code2 size={20} className="text-white" />
                                        </div>
                                        <span className="font-bold tracking-widest uppercase text-xs">Tech Stack</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3 leading-tight">MERN Stack Architecture</h3>
                                    <div className="grid grid-cols-1 gap-2 md:gap-3">
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                                            <p className="text-white/90 font-bold text-xs leading-relaxed">Frontend: <span className="text-white/70 font-medium">React 19, Tailwind, Motion, MUI</span></p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                            <p className="text-white/90 font-bold text-xs leading-relaxed">Backend: <span className="text-white/70 font-medium">Node.js, Express, MongoDB</span></p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></div>
                                            <p className="text-white/90 font-bold text-xs leading-relaxed">Auth: <span className="text-white/70 font-medium">JWT, Bcrypt, Secure Sessions</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating decorative cards */}
                            {!shouldReduceMotion && (
                                <motion.div
                                    animate={{ y: [0, -8, 0] }} // Reduced range for smoothness
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl z-20 hidden lg:block border border-slate-100 gpu"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                            <Globe2 size={16} />
                                        </div>
                                        <div className="pr-1 md:pr-2">
                                            <div className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Integration</div>
                                            <div className="text-xs font-black text-slate-800">4 Gov Databases</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs">
                                <span className="w-8 h-[2px] bg-primary"></span>
                                <span>The Vision</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-estate-text leading-[1.1] tracking-tighter">
                                Building India's Best Due Diligence Engine.
                            </h2>
                            <p className="text-base md:text-lg text-estate-muted font-medium leading-relaxed">
                                OmniProp solves the fragmented data problem in Indian real estate. By aggregating statutory data from <span className="text-primary font-bold">DORIS, DLR, CERSAI,</span> and <span className="text-primary font-bold">MCA21</span>, we provide a unified risk assessment profile.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Lightbulb size={20} />
                                    <h4 className="font-black text-base">Smart Discovery</h4>
                                </div>
                                <p className="text-sm text-estate-muted font-medium">Intelligent cross-referencing between land records and mortgage registries instantly.</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Code2 size={20} />
                                    <h4 className="font-black text-base">Scalable Architecture</h4>
                                </div>
                                <p className="text-sm text-estate-muted font-medium">Robust micro-frontend backend designed for high-concurrency searches.</p>
                            </div>
                        </div>

                        <div className="pt-2 flex justify-center lg:justify-start">
                            <motion.a
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                href="https://github.com/Sarthak-Salunke/OmniProp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-primary text-white px-5 py-3 rounded-lg font-black text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all group"
                            >
                                <Github size={18} className="group-hover:rotate-[360deg] transition-transform duration-700" />
                                <span>Explore Codebase on GitHub</span>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutProject;
