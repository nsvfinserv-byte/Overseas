import { motion } from 'framer-motion';
import { Shield, Award } from 'lucide-react';
import Avanse from '../images/Avanse.png';
import HDFC from '../images/HDFC.png';
import Nomad from '../images/nomad.jpg';
import Poonewalla from '../images/poonewalla.jpg';
import PSB from '../images/PSB.jpg';
import SBI from '../images/SBI.jpg';
import Tata from '../images/Tata.jpg';
import union from '../images/union.png';
import Canara from '../images/canara.png';
import Baroda from '../images/baroda.png';
import Axis from '../images/axis.png';
import ICICI from '../images/icici.png';

const Partners = () => {
  const partnerLogos = [
    { name: 'Avanse', logo: Avanse },
    { name: 'HDFC', logo: HDFC },
    { name: 'Nomad', logo: Nomad },
    { name: 'Poonewalla Finance', logo: Poonewalla },
    { name: 'Punjab And Sind Bank', logo: PSB },
    { name: 'SBI', logo: SBI },
    { name: 'Tata Capital', logo: Tata },
    { name: 'Union Bank', logo: union },
    { name: 'Canara Bank', logo: Canara },
    { name: 'Bank of Baroda', logo: Baroda },
    { name: 'Axis Bank', logo: Axis },
    { name: 'ICICI Bank', logo: ICICI },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-50 p-2 rounded-full">
              <Award className="w-8 h-8 text-[var(--color-ns-gold)]" />
            </div>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our Trusted Loan Partners
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We've partnered with leading loan providers to offer you the best financial support at competitive rates for your global education.
          </motion.p>
        </div>

        {/* Partner Logos */}
        <motion.div
          className="bg-slate-50 rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center p-4 hover:bg-white rounded-2xl transition-all duration-300 group hover:shadow-md border border-transparent hover:border-slate-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="bg-white p-4 sm:p-5 rounded-full shadow-sm mb-4 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
                  />
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-700 text-center group-hover:text-[var(--color-ns-royal)] transition-colors">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-slate-50 p-4 rounded-full text-[var(--color-ns-royal)]">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">RBI Registered</h3>
              <p className="text-slate-600 leading-relaxed">All our partners are registered with the Reserve Bank Of India.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-slate-50 p-4 rounded-full text-[var(--color-ns-royal)]">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Loan Grant Ratio</h3>
              <p className="text-slate-600 leading-relaxed">Our partners maintain an average loan grant ratio of 98%, ensuring smooth processing.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-slate-50 p-4 rounded-full text-[var(--color-ns-royal)]">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">24/7 Support</h3>
              <p className="text-slate-600 leading-relaxed">All our loan partners provide round-the-clock support for policy and loan queries.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
