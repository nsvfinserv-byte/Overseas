import { Helmet } from 'react-helmet-async';
import FlightHero from '../components/FlightHero';
import ServicesTrail from '../components/ServicesTrail';
// import CountryJourney from '../components/CountryJourney';
import ReferralSection from '../components/ReferralSection';
import ContactSection from '../components/ContactSection';
import WhatWeDo from '../components/WhatWeDo';
import KeyFeatures from '../components/KeyFeatures';
import Courses from '../components/Courses';
import Partners from '../components/Partners';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        // Add a small delay to ensure components are mounted
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>NSV Overseas | Your Study Abroad Journey Starts Here</title>
        <meta name="description" content="NSV Overseas helps students plan their global education journey with confidence. From counselling to applications and visa support." />
      </Helmet>

      <FlightHero />
      <ServicesTrail />
      {/* <CountryJourney /> */}
      <WhatWeDo />
      <KeyFeatures />
      <Courses />
      <Partners />
      <ReferralSection />
      <ContactSection />
    </>
  );
}
