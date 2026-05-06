import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, MapPin, GraduationCap, ArrowRight } from 'lucide-react';
import { universities } from '../data/universities';
import { countries } from '../data/countries';
import Partners from '../components/Partners';

export default function Universities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          uni.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || uni.countrySlug === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <>
      <Helmet>
        <title>Explore Universities | NSV Overseas</title>
        <meta name="description" content="Browse our comprehensive list of top global universities across various study destinations." />
      </Helmet>

      <section className="pt-32 pb-16 bg-[var(--color-ns-navy)] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Universities</h1>
          <p className="text-xl text-slate-300">
            Find the right institution for your academic and career aspirations.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-b border-slate-200 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all shadow-sm"
                placeholder="Search by university name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-64 flex-shrink-0">
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all shadow-sm bg-white"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="all">All Destinations</option>
                {countries.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredUniversities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUniversities.map((uni, index) => {
                const country = countries.find(c => c.slug === uni.countrySlug);
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all flex flex-col group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[var(--color-ns-sky)] transition-colors">
                        <GraduationCap className="text-[var(--color-ns-royal)] group-hover:text-white" size={24} />
                      </div>
                      {country && (
                        <Link to={`/countries/${country.slug}`} className="text-2xl hover:scale-110 transition-transform" title={country.name}>
                          {country.flag}
                        </Link>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{uni.name}</h3>
                    <p className="text-slate-500 text-sm mb-4 flex items-center">
                      <MapPin size={14} className="mr-1 text-slate-400" /> {uni.city}, {country?.name}
                    </p>
                    <p className="text-slate-600 mb-6 text-sm flex-grow">
                      {uni.description}
                    </p>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {uni.popularPrograms.slice(0, 3).map((prog, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link to="/contact" className="mt-auto w-full flex items-center justify-center space-x-2 py-3 bg-slate-50 hover:bg-[var(--color-ns-royal)] text-[var(--color-ns-royal)] hover:text-white rounded-xl font-medium transition-colors">
                      <span>Get Application Support</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <GraduationCap className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No universities found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your search criteria or changing the destination filter.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCountry('all');}}
                className="text-[var(--color-ns-sky)] font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Partners />
    </>
  );
}
