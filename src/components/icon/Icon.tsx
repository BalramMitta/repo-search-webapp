import React from 'react';

interface IconProps {
  url: string;
  size?: number; // Optional size parameter (defaults to 4 units)
}

const Icon: React.FC<IconProps> = ({ url, size = 4 }) => {
  return (
    <div
        style={{backgroundImage: `url(${url})`}}
        className={`w-${size} h-${size} bg-cover`}
      />
  );
};

export default Icon;
