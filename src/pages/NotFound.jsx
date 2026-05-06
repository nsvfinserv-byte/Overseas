import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | NSV Overseas</title>
      </Helmet>
      
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-20 bg-slate-50">
        <Plane className="w-24 h-24 text-slate-300 transform -rotate-45 mb-8" />
        <h1 className="text-6xl font-bold text-[var(--color-ns-navy)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Oops! Looks like you got lost.</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link 
          to="/" 
          className="bg-[var(--color-ns-gold)] hover:bg-[#b5952f] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
