import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function FlightHero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#112240] to-slate-50">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--color-ns-royal)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[var(--color-ns-sky)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-[var(--color-ns-gold)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
            Make Your Study Abroad <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-ns-sky)] to-[var(--color-ns-gold)]">
              Dreams Come True
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed">
            Expert guidance, trusted universities, education loans, visa support, and complete end-to-end assistance.
          </p>
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto my-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-3xl sm:text-5xl font-extrabold text-[var(--color-ns-gold)] mb-2">450+</span>
              <span className="text-slate-300 text-xs sm:text-sm font-medium text-center leading-relaxed">Partner<br />Universities<br />Worldwide</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-3xl sm:text-5xl font-extrabold text-[var(--color-ns-gold)] mb-2">98%</span>
              <span className="text-slate-300 text-xs sm:text-sm font-medium text-center leading-relaxed">Visa Success<br />Rate</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-3xl sm:text-5xl font-extrabold text-[var(--color-ns-gold)] mb-2">20+</span>
              <span className="text-slate-300 text-xs sm:text-sm font-medium text-center leading-relaxed">Countries</span>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/#countries"
              className="px-8 py-4 bg-white text-[var(--color-ns-navy)] rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl"
            >
              Explore Countries
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-[var(--color-ns-gold)] text-white rounded-full font-bold text-lg hover:bg-[#b5952f] transition-colors shadow-xl shadow-[#d4af37]/20"
            >
              Book Free Counselling
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Animated Airplane */}
      <motion.div
        className="absolute z-20 flex flex-col items-center pointer-events-none"
        initial={{ x: '-5vw', y: '35vw' }}
        animate={{ x: '120vw', y: '-90vw' }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="relative group">
          <Plane className="w-32 h-32 text-white drop-shadow-2xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12 ml-12 whitespace-nowrap">
            <span className="text-[var(--color-ns-navy)] font-bold text-sm bg-white/90 px-3 py-1 rounded shadow-lg">
              NSV Overseas
            </span>
          </div>
          {/* Exhaust trail */}
          <motion.div
            className="absolute top-[80%] right-[80%] w-32 h-2 bg-gradient-to-r from-transparent via-white/50 to-white rounded-full blur-sm transform rotate-45 origin-right"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
