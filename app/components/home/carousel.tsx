import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useData } from "~/hooks/useData";

const AUTO_SLIDE_DELAY = 4000;

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const { properties } = useData();

  const total = properties.length;

  const next = () => {
    if (isAnimating || total === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    if (isAnimating || total === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(0);
    }
  }, [total, currentIndex]);

  useEffect(() => {
    if (total === 0) return;
    const interval = setInterval(() => {
      next();
    }, AUTO_SLIDE_DELAY);
    return () => clearInterval(interval);
  }, [total, isAnimating]);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 60) {
      deltaX > 0 ? prev() : next();
    }
    touchStartX.current = null;
  };

  if (total === 0) return null;

  return (
    <div
      className="relative w-full h-[250px] overflow-hidden mb-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        {properties.map((property, i) => (
          <div key={i} className="relative min-w-full h-full">
            <img
              src={property.imageUrl}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
              <h2 className="text-xl capitalize md:text-2xl font-bold">
                {property.title}
              </h2>
              <p className="text-sm md:text-base opacity-90">
                {property.country}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {properties.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-4 bg-purple-600" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
                   text-white hover:text-purple-600"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={next}
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
                   text-white hover:text-purple-600"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};
