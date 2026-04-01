import { useState, useEffect } from 'react';

const BackgroundCarousel = ({ images, interval = 10000 }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${
            idx === currentIdx ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Very subtle dark overlay for the background */}
          <div className="absolute inset-0 bg-slate-800/10" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-800/30" />
        </div>
      ))}
    </div>
  );
};

export default BackgroundCarousel;
