import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ContactSection from '../components/ContactSection';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us | NSV Overseas</title>
        <meta name="description" content="Get in touch with NSV Overseas to book a free counselling session and start your study abroad journey." />
      </Helmet>
      
      <div className="pt-20 bg-slate-50">
        <ContactSection />
      </div>
    </>
  );
}
