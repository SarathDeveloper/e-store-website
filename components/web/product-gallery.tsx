"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative aspect-3/4 rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-50 shadow-md cursor-crosshair group"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt="Product Image"
          fill
          className={cn(
            "object-cover transition-transform duration-200",
            isZooming ? "" : "group-hover:scale-105"
          )}
          style={isZooming ? zoomStyle : {}}
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden bg-zinc-100 border-2 transition-all",
                activeImage === img ? "border-primary" : "border-transparent hover:border-primary/50"
              )}
            >
              <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
