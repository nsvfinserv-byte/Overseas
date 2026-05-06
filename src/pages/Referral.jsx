import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ReferralSection from '../components/ReferralSection';

export default function Referral() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Refer a Student | NSV Overseas</title>
        <meta name="description" content="Refer a student to NSV Overseas and help them achieve their study abroad dreams." />
      </Helmet>
      
      <div className="pt-20">
        <ReferralSection />
      </div>
    </>
  );
}
