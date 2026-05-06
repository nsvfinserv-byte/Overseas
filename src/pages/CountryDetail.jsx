import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import { countries } from '../data/countries';
import { universities } from '../data/universities';

export default function CountryDetail() {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const country = countries.find(c => c.slug === slug);
  const countryUniversities = universities.filter(u => u.countrySlug === slug);

  if (!country) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Study in {country.name} | NSV Overseas</title>
        <meta name="description" content={`Explore study options, popular programs, and university application support for ${country.name} with NSV Overseas.`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[var(--color-ns-navy)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <MapPin size={18} className="text-[var(--color-ns-sky)]" />
                <span className="text-sm font-medium">Destination: {country.region}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 flex items-center">
                <span className="mr-4">{country.flag}</span> Study in {country.name}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                {country.overview}
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm text-center">
                <h3 className="text-lg font-semibold mb-2">Major Intakes</h3>
                <p className="text-[var(--color-ns-sky)] font-medium mb-6">{country.intakes}</p>
                <Link to="/contact" className="block w-full bg-[var(--color-ns-gold)] hover:bg-[#b5952f] text-white py-3 rounded-xl font-medium transition-colors">
                  Check Eligibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Study Here */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Study in {country.name}?</h2>
              <div className="space-y-6">
                {country.whyStudyPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="text-[var(--color-ns-sky)] mr-4 flex-shrink-0 mt-1" size={24} />
                    <p className="text-slate-700 text-lg">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Popular Programs</h3>
                <div className="flex flex-wrap gap-3">
                  {country.popularPrograms.map((program, index) => (
                    <span key={index} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-700 font-medium">
                      {program}
                    </span>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100 text-sm text-slate-500 italic">
                  Note: NSV Overseas can help students understand application requirements, document preparation, and available study options for this destination.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Institutions in {country.name}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore leading universities where we assist with applications and admissions processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countryUniversities.map((uni, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all group flex flex-col">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[var(--color-ns-royal)] transition-colors">
                  <GraduationCap className="text-[var(--color-ns-royal)] group-hover:text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{uni.name}</h3>
                <p className="text-slate-500 text-sm mb-4 flex items-center">
                  <MapPin size={14} className="mr-1" /> {uni.city}
                </p>
                <p className="text-slate-600 mb-6 text-sm flex-grow">
                  {uni.description}
                </p>
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Known For</p>
                  <div className="flex flex-wrap gap-2">
                    {uni.popularPrograms.slice(0, 2).map((prog, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to="/contact" className="mt-auto w-full text-center py-3 border border-[var(--color-ns-royal)] text-[var(--color-ns-royal)] hover:bg-[var(--color-ns-royal)] hover:text-white rounded-xl font-medium transition-colors">
                  Get Application Support
                </Link>
              </div>
            ))}
          </div>
          
          {countryUniversities.length === 0 && (
            <p className="text-center text-slate-500">University list coming soon.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-ns-royal)] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to apply to {country.name}?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Book a free counselling session to discuss your profile, university options, and the visa process.
          </p>
          <Link to="/contact" className="inline-flex items-center space-x-2 bg-white text-[var(--color-ns-royal)] hover:bg-slate-100 px-8 py-4 rounded-full font-bold transition-colors shadow-lg">
            <span>Book Free Counselling</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
