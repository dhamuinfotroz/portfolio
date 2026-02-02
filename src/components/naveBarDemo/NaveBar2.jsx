import { useLocation } from 'react-router-dom';
import PillNav from '../PillNav';
import logo from '@/assets/react.svg';

const NaveBar2 = () => {
  const location = useLocation();

  return (
    <div className="w-full flex justify-center">
      <PillNav
        logo={logo}
        logoAlt="InfoCloud"
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Explore', href: '/explore/upsc' },
          { label: 'Profile', href: '/profile' },
          { label: 'Contact', href: '/contact' }
        ]}
        activeHref={location.pathname}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={false}
      />
    </div>
  );
};

export default NaveBar2;
