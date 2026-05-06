import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { countries } from '../data/countries';

const CountryCard = ({ country, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100 group flex flex-col h-full"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">{country.flag}</span>
        <h3 className="text-xl font-bold text-slate-800">{country.name}</h3>
      </div>
      <MapPin className="text-slate-300 group-hover:text-[var(--color-ns-sky)] transition-colors" />
    </div>
    <p className="text-slate-600 text-sm mb-4 flex-grow">
      {country.shortDescription}
    </p>
    <div className="mb-6">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Popular Fields</p>
      <div className="flex flex-wrap gap-2">
        {country.popularPrograms.slice(0, 2).map((program, i) => (
          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
            {program}
          </span>
        ))}
      </div>
    </div>
    <Link 
      to={`/countries/${country.slug}`}
      className="mt-auto flex items-center justify-center space-x-2 w-full py-3 bg-slate-50 hover:bg-[var(--color-ns-royal)] text-[var(--color-ns-royal)] hover:text-white rounded-xl font-medium transition-colors"
    >
      <span>View Universities</span>
      <ArrowRight size={18} />
    </Link>
  </motion.div>
);

export default function CountryJourney() {
  const westwardRoute = ['germany', 'netherlands', 'italy', 'france', 'ireland', 'united-kingdom', 'canada', 'united-states'];
  const otherDestinations = ['australia', 'new-zealand'];

  const westwardCountries = westwardRoute.map(slug => countries.find(c => c.slug === slug)).filter(Boolean);
  const otherCountries = otherDestinations.map(slug => countries.find(c => c.slug === slug)).filter(Boolean);

  return (
    <section id="countries" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Global Destinations
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore top study destinations across the world and find the perfect fit for your academic goals.
          </motion.p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <span className="w-8 h-1 bg-[var(--color-ns-gold)] mr-4 rounded-full"></span>
            Westward Route from India
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {westwardCountries.map((country, index) => (
              <CountryCard key={country.slug} country={country} delay={index * 0.1} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <span className="w-8 h-1 bg-[var(--color-ns-sky)] mr-4 rounded-full"></span>
            Other Popular Destinations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCountries.map((country, index) => (
              <CountryCard key={country.slug} country={country} delay={index * 0.1} />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/universities"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-xl"
          >
            <span>Browse All Universities</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
