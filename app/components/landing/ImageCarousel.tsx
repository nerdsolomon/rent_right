import { useState, useEffect } from 'react';
import { images } from '~/services/asset.services';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const getVisibleImages = () => {
    return [
      images[currentIndex],
      images[(currentIndex + 1) % images.length],
      images[(currentIndex + 2) % images.length],
    ];
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="relative w-full">
      {/* Mobile View - Single Column */}
      <div className="md:hidden space-y-4">
        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg h-48 sm:h-64">
          <img 
            src={visibleImages[0]} 
            alt="Featured property" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg h-48 sm:h-64">
          <img 
            src={visibleImages[1]} 
            alt="Property 2" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Desktop View - Grid Layout */}
      <div className="hidden md:grid grid-cols-3 gap-4 h-96">
        {/* Large image - left side, spans 2 rows */}
        <div className="col-span-1 row-span-2 rounded-3xl overflow-hidden shadow-lg">
          <img 
            src={visibleImages[0]} 
            alt="Featured property" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top right image */}
        <div className="col-span-2 rounded-3xl overflow-hidden shadow-lg h-44">
          <img 
            src={visibleImages[1]} 
            alt="Property 2" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom right image */}
        <div className="col-span-2 rounded-3xl overflow-hidden shadow-lg h-44">
          <img 
            src={visibleImages[2]} 
            alt="Property 3" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}
