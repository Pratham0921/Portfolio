import React from 'react';
import { motion } from 'framer-motion';

const LogoWall = ({ logos, speed = 20, direction = 'left' }) => {
  return (
    <div className="relative w-full overflow-hidden py-10 bg-black/20 flex flex-col items-center">
      <div className="w-full flex" style={{ width: '200%' }}>
        <motion.div
          className="flex whitespace-nowrap items-center w-full"
          animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
          transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        >
          {logos.concat(logos).map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              {typeof logo.icon === 'string' ? (
                <span className="text-4xl">{logo.icon}</span>
              ) : (
                <img src={logo.src} alt={logo.name} className="h-12 w-auto object-contain" />
              )}
              {logo.name && <span className="ml-3 text-lg font-mono text-white/80">{logo.name}</span>}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoWall;
