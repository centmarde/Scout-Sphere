import React from 'react';
import { useTheme } from '../../theme/theme';

// Import fonts (can be moved to global CSS)

const Logo: React.FC = () => {
  const theme = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/icons/icon.png" 
        alt="Scout Sphere Logo"
        className="w-10 h-10 object-contain" 
      />
      <div className="relative">
        <h1 
          className="font-['Funnel_Sans'] text-2xl font-bold m-0"
          style={{ color: theme.colors.primary }}
        >
          SCOUT SPHERE
        </h1>
        <p 
          className="font-['Funnel_Sans'] text-sm font-normal m-0 tracking-wider absolute top-[70%]"
          style={{ color: '#d3d3d3' }}
        >
          Heritage Preservation
        </p>
      </div>
    </div>
  );
};

export default Logo;
