"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Database, 
  Target, 
  Zap, 
  ArrowRight, 
  Mail, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

// --- DATA ---
const projectsData = [
  {
    slug: 'd2c-skincare-growth',
    title: 'D2C Skincare Brand',
    description: 'Uncovered $120k in hidden annual revenue by identifying high-churn customer segments and optimizing LTV.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    problem: 'The client was scaling ad spend rapidly but their overall profitability was dropping. They had thousands of orders but no clear visibility into which specific products or customer cohorts were actually driving net profit versus just top-line revenue.',
    insights: [
      'Discovered that 35% of first-time buyers who purchased the "Hero Bundle" never returned, despite it being the main focus of acquisition.',
      'Identified a hidden segment of loyal customers buying single specific items who had a 400% higher Lifetime Value (LTV).',
      'Found significant revenue leakage in unoptimized shipping tiers that were eating into margins on low AOV orders.'
    ],
    recommendations: [
      'Restructured Facebook/TikTok ad campaigns to target lookalikes of the high-LTV single-item buyers.',
      'Implemented a post-purchase email flow specifically designed to cross-sell the high-churn bundle buyers onto subscription plans.',
      'Adjusted free shipping thresholds based on data, immediately recovering 8% in profit margins.'
    ]
  },
  {
    slug: 'shopify-apparel-optimization',
    title: 'Shopify Apparel Retailer',
    description: 'Reduced inventory holding costs by 22% and increased sell-through rates using a custom predictive dashboard.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
    problem: 'The brand consistently faced stockouts on best-sellers while holding excess inventory of slow-moving items. Their Shopify reports were too basic to forecast demand accurately across different variants (size/color).',
    insights: [
      'Built a custom dashboard that tracked velocity not just by product, but by SKU/Variant level over 7, 30, and 90-day rolling periods.',
      'Identified that specific sizes in regional markets sold out 3x faster than the national average.',
      'Found that 15% of marketing budget was being spent driving traffic to products with broken sizes (sold out in popular sizes).'
    ],
    recommendations: [
      'Integrated an automated alert system when high-velocity SKUs hit 14 days of remaining inventory.',
      'Redirected ad spend dynamically away from products with low conversion rates due to size availability.',
      'Created regional inventory allocation models based on historical purchase density.'
    ]
  },
  {
    slug: 'niche-coffee-roaster',
    title: 'Niche Coffee Roaster',
    description: 'Increased subscription retention by 45% by analyzing cancellation reasons and cohort purchase patterns.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1600',
    problem: 'Despite strong top-of-funnel acquisition, their "Subscribe & Save" program had a massive drop-off rate between Month 2 and Month 3, making their CPA unsustainable.',
    insights: [
      'Data revealed that customers were churning because they had too much coffee (overstocked), not because they disliked the product.',
      'A specific cohort of buyers who purchased brewing equipment alongside their first order had an 80% higher retention rate.',
      'The default 2-week delivery interval was too frequent for 60% of their user base.'
    ],
    recommendations: [
      'Changed the default subscription interval to 3 weeks and added an easy "Skip a Delivery" button via SMS.',
      'Created an onboarding email sequence focusing on education and brewing techniques for users who didn\'t buy equipment.',
      'Launched an automated survey triggered 2 days before a predicted cancellation based on usage models.'
    ]
  }
];

// --- COMPONENTS ---

const Navbar = ({ setRoute, currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route, sectionId = null) => {
    setRoute(route);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="text-xl font-bold tracking-tighter cursor-pointer flex items-center gap-2"
            onClick={() => handleNavClick('/')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              data_to_profit
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavClick('/', 'problem')} className="text-sm text-gray-300 hover:text-white transition-colors">The Problem</button>
            <button onClick={() => handleNavClick('/', 'solutions')} className="text-sm text-gray-300 hover:text-white transition-colors">Solutions</button>
            <button onClick={() => handleNavClick('/', 'projects')} className="text-sm text-gray-300 hover:text-white transition-colors">Case Studies</button>
            <button onClick={() => handleNavClick('/', 'process')} className="text-sm text-gray-300 hover:text-white transition-colors">Process</button>
            <button 
              onClick={() => handleNavClick('/', 'contact')}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Get Free Insights
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-gray-950 border-b border-white/10 shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <button onClick={() => handleNavClick('/', 'problem')} className="text-left text-gray-300 py-2 border-b border-white/5">The Problem</button>
              <button onClick={() => handleNavClick('/', 'solutions')} className="text-left text-gray-300 py-2 border-b border-white/5">Solutions</button>
              <button onClick={() => handleNavClick('/', 'projects')} className="text-left text-gray-300 py-2 border-b border-white/5">Case Studies</button>
              <button onClick={() => handleNavClick('/', 'process')} className="text-left text-gray-300 py-2 border-b border-white/5">Process</button>
              <button onClick={() => handleNavClick('/', 'contact')} className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium">
                Get Free Insights
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = ({ setRoute }) => {
  return (
    // Fixed padding instead of min-h-screen vertically centers to prevent large empty gaps on big screens
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      
      {/* SaaS Premium Grid Background to fill empty space visually */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* NEW CREATIVE ELEMENT: Messy Data to Profitable Insights */}
            <div className="inline-flex items-center p-1.5 pr-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <div className="flex items-center gap-3">
                
                {/* Visual: Messy Chaotic Dots */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 border border-white/10 relative overflow-hidden">
                   <motion.div animate={{ y: [-3, 3, -3], x: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute w-1 h-1 bg-red-400 rounded-full"></motion.div>
                   <motion.div animate={{ y: [3, -3, 3], x: [3, -3, 3] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="absolute w-1 h-1 bg-yellow-400 rounded-full"></motion.div>
                   <motion.div animate={{ y: [-2, 4, -2], x: [2, -1, 2] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }} className="absolute w-1 h-1 bg-orange-400 rounded-full"></motion.div>
                </div>

                <ArrowRight className="w-4 h-4 text-gray-500" />

                {/* Visual: Structured Profit Bars */}
                <div className="flex items-end gap-1 w-8 h-8 justify-center pb-1.5">
                   <motion.div animate={{ height: ["40%", "60%", "40%"] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 bg-blue-400 rounded-sm"></motion.div>
                   <motion.div animate={{ height: ["60%", "80%", "60%"] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="w-1.5 bg-indigo-400 rounded-sm"></motion.div>
                   <motion.div animate={{ height: ["80%", "100%", "80%"] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="w-1.5 bg-green-400 rounded-sm"></motion.div>
                </div>
              </div>
              
              <div className="w-px h-5 bg-white/10 mx-3"></div>
              <span className="text-sm font-medium text-gray-300">
                Messy Data <span className="text-gray-500 mx-1">→</span> Clear Profit
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Turn Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                E-commerce Data
              </span>
              <br /> Into Profit.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              I help Shopify & D2C brands find hidden revenue leaks and increase sales using simple data insights and storytelling dashboards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if(el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 rounded-full bg-white text-gray-950 font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Get Free Insights
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('projects');
                  if(el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-lg transition-all hover:border-white/20 backdrop-blur-sm"
              >
                View Case Studies
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative lg:block hidden perspective-1000"
          >
            {/* Dashboard Mockup */}
            <div className="relative rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/10 p-6 shadow-2xl transform rotate-y-[-10deg] rotate-x-[5deg]">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-full">profit_overview.dash</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-gray-400 text-sm mb-1">Recovered Revenue</div>
                  <div className="text-3xl font-bold text-white">$42,500</div>
                  <div className="text-green-400 text-xs mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12.5% this month
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-gray-400 text-sm mb-1">Customer LTV</div>
                  <div className="text-3xl font-bold text-white">$385.00</div>
                  <div className="text-green-400 text-xs mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +8.2% this month
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/5 h-40 flex items-end justify-between gap-2">
                {/* Simulated Chart Bars */}
                {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-sm"
                  ></motion.div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 top-20 bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex items-center gap-4 shadow-xl"
            >
              <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Target Reached</div>
                <div className="font-bold text-white">+24% Conv. Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const problems = [
    {
      icon: <Database className="w-6 h-6 text-red-400" />,
      title: "Drowning in Data",
      desc: "Google Analytics, Shopify, Facebook Ads... You have numbers everywhere but no clear story on what to fix."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-yellow-400" />,
      title: "Inconsistent Sales",
      desc: "One month is great, the next is terrible. You're reliant on ad performance rather than a predictable system."
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Blind Spots in Profit",
      desc: "Top-line revenue looks good, but high acquisition costs and returns are secretly eating your margins."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-gray-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sound Familiar?</h2>
          <p className="text-gray-400 text-lg">Most e-commerce founders are flying blind, making critical decisions based on gut feelings rather than hard data.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((prob, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                {prob.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{prob.title}</h3>
              <p className="text-gray-400 leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const solutions = [
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
      title: "Sales Story Dashboards",
      desc: "Custom built dashboards that don't just show numbers, they tell you exactly what happened yesterday and what to do today."
    },
    {
      icon: <Target className="w-6 h-6 text-purple-400" />,
      title: "Product Profit Analysis",
      desc: "Identify your true 'hero' products—the ones that bring in high LTV customers with low return rates."
    },
    {
      icon: <Users className="w-6 h-6 text-green-400" />,
      title: "Customer Cohort Insights",
      desc: "Understand exactly who your best customers are, when they buy again, and how to acquire more of them."
    }
  ];

  return (
    <section id="solutions" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              From Raw Data to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Actionable Strategy.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              I don't just hand you spreadsheets. I build automated systems that highlight your biggest opportunities for growth and profit extraction.
            </p>
            
            <div className="space-y-6">
              {solutions.map((sol, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 group cursor-default"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all">
                    {sol.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{sol.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{sol.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative"
          >
            <div className="aspect-square md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden border border-white/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                alt="Data Dashboard Analysis" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Glass overlay card */}
              <div className="absolute bottom-8 left-8 right-8 z-20 bg-gray-950/60 backdrop-blur-md border border-white/10 p-6 rounded-xl">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Identified Opportunity</div>
                    <div className="text-2xl font-bold text-white">VIP Retention Flow</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300 mb-1">Est. Impact</div>
                    <div className="text-xl font-bold text-green-400">+$15k / mo</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = ({ setRoute }) => {
  return (
    <section id="projects" className="py-24 bg-gray-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Case Studies</h2>
            <p className="text-gray-400 text-lg">Real numbers. Real growth. See how data analysis translates directly into increased e-commerce profit.</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, i) => (
            <motion.div 
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                setRoute(`/project/${project.slug}`);
                window.scrollTo(0, 0);
              }}
              className="group cursor-pointer flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">{project.description}</p>
                <div className="flex items-center text-blue-400 text-sm font-medium mt-auto group-hover:translate-x-2 transition-transform">
                  Read Case Study <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      num: "01",
      title: "Share Your Data",
      desc: "Grant read-only access to Shopify, GA4, and your ad platforms. Secure, quick, and hassle-free."
    },
    {
      num: "02",
      title: "Deep Analysis & Build",
      desc: "I dive deep into your numbers to find leaks and build your custom storytelling dashboard."
    },
    {
      num: "03",
      title: "Actionable Insights",
      desc: "We review the dashboard together. You walk away with a clear roadmap to increase profit margins."
    }
  ];

  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-gray-400 text-lg">Three simple steps to stop guessing and start scaling profitably.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0"></div>

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-gray-900 border-2 border-blue-500/50 flex items-center justify-center text-2xl font-bold text-white mb-6 mx-auto relative z-10">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">{step.title}</h3>
              <p className="text-gray-400 text-center leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gray-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-md"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to stop leaving money on the table?</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Get actionable insights about your Shopify store's data or any ecommerce data. No commitment required.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:sudiptabusiness30@gmail.com" 
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-gray-950 font-bold text-lg hover:scale-105 transition-transform"
            >
              <Mail className="w-5 h-5" />
              Email Me Directly
            </a>
            <a 
              href="https://instagram.com/data_to_profit" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:scale-105 transition-transform"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 bg-gray-950 border-t border-white/5 text-center">
    <div className="flex justify-center items-center gap-2 mb-4">
      <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <TrendingUp className="w-3 h-3 text-white" />
      </div>
      <span className="text-white font-bold tracking-tighter">data_to_profit</span>
    </div>
    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} data_to_profit. All rights reserved.</p>
  </footer>
);

// --- PROJECT PAGE COMPONENT (Simulating dynamic route) ---

const ProjectPage = ({ project, setRoute }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => setRoute('/')}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ChevronRight className="w-5 h-5 rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{project.title}</h1>
          <p className="text-xl text-gray-300 mb-12">{project.description}</p>
          
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-16 shadow-2xl">
            <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-red-400" />
                The Problem
              </h3>
              <p className="text-gray-400 leading-relaxed">{project.problem}</p>
            </div>
            
            <div className="md:col-span-2 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Key Insights Discovered
                </h3>
                <ul className="space-y-4">
                  {project.insights.map((insight, i) => (
                    <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-sm font-bold">{i+1}</div>
                      </div>
                      <span className="text-gray-300">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  Strategic Recommendations
                </h3>
                <ul className="space-y-4">
                  {project.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/5 to-transparent border border-green-500/10">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      </div>
                      <span className="text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA embedded in project page */}
        <div className="mt-24 p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Want similar results for your store?</h3>
          <p className="text-gray-400 mb-8">Let's look at your data and find the hidden revenue.</p>
          <button 
             onClick={() => {
               setRoute('/');
               setTimeout(() => {
                 const el = document.getElementById('contact');
                 if(el) el.scrollIntoView({ behavior: 'smooth' });
               }, 100);
             }}
            className="px-8 py-3 rounded-full bg-white text-gray-950 font-bold hover:scale-105 transition-transform inline-block"
          >
            Get Free Insights
          </button>
        </div>

      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [route, setRoute] = useState('/');
  
  // Extract project slug if route is a project page
  const isProjectRoute = route.startsWith('/project/');
  const currentProjectSlug = isProjectRoute ? route.split('/project/')[1] : null;
  const currentProject = isProjectRoute ? projectsData.find(p => p.slug === currentProjectSlug) : null;

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 font-sans selection:bg-blue-500/30">
      <Navbar setRoute={setRoute} currentRoute={route} />
      
      <main>
        {isProjectRoute && currentProject ? (
          <ProjectPage project={currentProject} setRoute={setRoute} />
        ) : (
          <>
            <HeroSection setRoute={setRoute} />
            <ProblemSection />
            <SolutionSection />
            <ProjectsSection setRoute={setRoute} />
            <ProcessSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}