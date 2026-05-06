import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { submitReferral } from '../services/referralService';

export default function ReferralSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const form = e.target;
    try {
      await submitReferral({
        referrerName:     form.referrerName.value,
        referrerContact:  form.referrerContact.value,
        studentName:      form.studentName.value,
        studentContact:   form.studentContact.value,
        preferredCountry: form.preferredCountry.value,
      });
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      setError(err.message || 'Failed to submit referral. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-ns-gold)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Content Side */}
            <div className="p-10 md:p-16 bg-[var(--color-ns-navy)] text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-8">
                  <Gift size={18} className="text-[var(--color-ns-gold)]" />
                  <span className="text-sm font-medium">Referral Program</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Help a friend study abroad, <br className="hidden md:block" />
                  <span className="text-[var(--color-ns-sky)]">earn rewards.</span>
                </h2>
                
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Refer a student planning to study abroad and help them connect with NSV Overseas guidance. We appreciate your trust in us.
                </p>

                <ul className="space-y-4 mb-10">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[var(--color-ns-sky)] mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-300">Simple 1-minute referral process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[var(--color-ns-sky)] mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-300">Your friend gets prioritized free counselling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[var(--color-ns-sky)] mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-300">Exclusive benefits for successful enrollments</span>
                  </li>
                </ul>

                <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4">
                  <Users size={24} className="text-[var(--color-ns-gold)]" />
                  <p className="text-sm text-slate-300">Join hundreds of referrers who have helped students reach their global goals.</p>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-10 md:p-16">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Submit a Referral</h3>
              <p className="text-slate-500 mb-8 text-sm">Fill out the details below and we&apos;ll take it from here.</p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl flex flex-col items-center text-center h-full justify-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h4 className="text-xl font-bold mb-2">Referral Submitted!</h4>
                  <p>Thank you! We&apos;ll reach out to the student shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center space-x-3 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ref-referrerName" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                      <input id="ref-referrerName" type="text" name="referrerName" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="ref-referrerContact" className="block text-sm font-medium text-slate-700 mb-1">Your Phone/Email</label>
                      <input id="ref-referrerContact" type="text" name="referrerContact" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ref-studentName" className="block text-sm font-medium text-slate-700 mb-1">Student&apos;s Name</label>
                      <input id="ref-studentName" type="text" name="studentName" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all" placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label htmlFor="ref-studentContact" className="block text-sm font-medium text-slate-700 mb-1">Student&apos;s Contact</label>
                      <input id="ref-studentContact" type="text" name="studentContact" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all" placeholder="Phone or Email" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ref-preferredCountry" className="block text-sm font-medium text-slate-700 mb-1">Preferred Country</label>
                    <select id="ref-preferredCountry" name="preferredCountry" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-white">
                      <option value="">Select a country (optional)</option>
                      <option value="germany">Germany</option>
                      <option value="uk">United Kingdom</option>
                      <option value="usa">United States</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[var(--color-ns-gold)] hover:bg-[#b5952f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-[#d4af37]/20 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /><span>Submitting...</span></>
                    ) : (
                      <><span>Submit Referral</span><ArrowRight size={20} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
