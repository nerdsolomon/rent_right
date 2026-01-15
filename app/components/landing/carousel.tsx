import { useState, useEffect } from "react";
import { images } from "~/services/asset.services";

const AUTO_SLIDE_DELAY = 4000;

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTO_SLIDE_DELAY);
    return () => clearInterval(interval);
  }, [total]);

  const getVisibleImages = () => [
    images[currentIndex],
    images[(currentIndex + 1) % total],
    images[(currentIndex + 2) % total],
  ];

  const visibleImages = getVisibleImages();

  return (
    <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:h-96">
      <div className="rounded-2xl md:col-span-1 md:row-span-2 overflow-hidden shadow-lg h-48 sm:h-64 md:h-full">
        <img
          src={visibleImages[0]}
          alt="Featured property"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="rounded-2xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-46 md:col-span-2">
        <img
          src={visibleImages[1]}
          alt="Property 2"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="rounded-2xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-46 md:col-span-2">
        <img
          src={visibleImages[2]}
          alt="Property 3"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
