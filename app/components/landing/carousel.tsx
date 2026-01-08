import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { images } from "~/services/asset.services";

const AUTO_SLIDE_DELAY = 4000;

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(next, AUTO_SLIDE_DELAY);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div
      className="relative w-full h-[400px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full">
            <img
              src={img}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-4 bg-blue-500" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
                   p-3 bg-blue-500/70 text-white rounded-full
                   hover:bg-blue-700"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={next}
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
                   p-3 bg-blue-500/70 text-white rounded-full
                   hover:bg-blue-700"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};
