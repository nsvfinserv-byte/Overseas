import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { submitReferral } from '../services/referralService';

/* ── Validation helpers ── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isValidPhone = (v) => /^[+]?[\d\s\-().]{7,15}$/.test(v.trim());
const isValidContact = (v) => isValidEmail(v) || isValidPhone(v);
const isValidName = (v) => v.trim().length >= 2 && /^[a-zA-Z\s'.'-]+$/.test(v.trim());

function validate(fields) {
  const errs = {};
  if (!isValidName(fields.referrerName))
    errs.referrerName = 'Enter your full name (at least 2 characters, letters only).';
  if (!isValidContact(fields.referrerContact))
    errs.referrerContact = 'Enter a valid email address or phone number.';
  if (!isValidName(fields.studentName))
    errs.studentName = "Enter the student's full name (at least 2 characters, letters only).";
  if (!isValidContact(fields.studentContact))
    errs.studentContact = "Enter the student's valid email address or phone number.";
  return errs;
}

export default function ReferralSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState({
    referrerName: '', referrerContact: '',
    studentName: '', studentContact: '', preferredCountry: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    // Clear the field error as user types
    if (fieldErrors[name]) {
      setFieldErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const errs = validate(fields);
    if (errs[name]) setFieldErrors((p) => ({ ...p, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields touched so errors show
    setTouched({ referrerName: true, referrerContact: true, studentName: true, studentContact: true });
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await submitReferral({
        referrerName: fields.referrerName.trim(),
        referrerContact: fields.referrerContact.trim(),
        studentName: fields.studentName.trim(),
        studentContact: fields.studentContact.trim(),
        preferredCountry: fields.preferredCountry,
      });
      setIsSubmitted(true);
      setFields({ referrerName: '', referrerContact: '', studentName: '', studentContact: '', preferredCountry: '' });
      setFieldErrors({});
      setTouched({});
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      setError(err.message || 'Failed to submit referral. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all ${fieldErrors[name] && touched[name]
      ? 'border-red-400 bg-red-50'
      : 'border-slate-200'
    }`;

  const FieldError = ({ name }) =>
    fieldErrors[name] && touched[name] ? (
      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
        <AlertCircle size={12} /> {fieldErrors[name]}
      </p>
    ) : null;

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
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center space-x-3 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ref-referrerName" className="block text-sm font-medium text-slate-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ref-referrerName"
                        type="text"
                        name="referrerName"
                        value={fields.referrerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('referrerName')}
                        placeholder="Your Name"
                        autoComplete="name"
                      />
                      <FieldError name="referrerName" />
                    </div>
                    <div>
                      <label htmlFor="ref-referrerContact" className="block text-sm font-medium text-slate-700 mb-1">
                        Your Phone / Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ref-referrerContact"
                        type="text"
                        name="referrerContact"
                        value={fields.referrerContact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('referrerContact')}
                        placeholder="email@example.com or +91 98000 00000"
                        autoComplete="email"
                      />
                      <FieldError name="referrerContact" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ref-studentName" className="block text-sm font-medium text-slate-700 mb-1">
                        Student&apos;s Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ref-studentName"
                        type="text"
                        name="studentName"
                        value={fields.studentName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('studentName')}
                        placeholder="Student Name"
                      />
                      <FieldError name="studentName" />
                    </div>
                    <div>
                      <label htmlFor="ref-studentContact" className="block text-sm font-medium text-slate-700 mb-1">
                        Student&apos;s Contact <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ref-studentContact"
                        type="text"
                        name="studentContact"
                        value={fields.studentContact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('studentContact')}
                        placeholder="Phone or Email"
                      />
                      <FieldError name="studentContact" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ref-preferredCountry" className="block text-sm font-medium text-slate-700 mb-1">Preferred Country</label>
                    <select
                      id="ref-preferredCountry"
                      name="preferredCountry"
                      value={fields.preferredCountry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select a country (optional)</option>
                      <option value="germany">Germany</option>
                      <option value="uk">United Kingdom</option>
                      <option value="usa">United States</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <p className="text-xs text-slate-400">Fields marked <span className="text-red-500">*</span> are required.</p>

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
