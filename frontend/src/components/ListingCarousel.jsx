import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function ListingCarousel({ children }) {
  const ref = useRef(null);
  const scrollByPx = (px) => ref.current?.scrollBy({ left: px, behavior: "smooth" });

  return (
    <div className="relative">
  <div ref={ref} className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth py-2">
    {children}
  </div>
  <button
    onClick={() => scrollByPx(-600)}
    className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-50 md:inline-flex"
  >
    <ChevronLeft size={18} />
  </button>
  <button
    onClick={() => scrollByPx(600)}
    className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-50 md:inline-flex"
  >
    <ChevronRight size={18} />
  </button>
</div>

  );
}
