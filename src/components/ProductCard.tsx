import React from 'react';
import { Heart, BadgeCheck, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  imageSrc: string;
  title: string;
  size: string;
  artist: string;
  price: string;
  emi: string;
  link?: string;
}

export default function ProductCard({
  imageSrc,
  title,
  size,
  artist,
  price,
  emi,
  link = "https://www.memeraki.com/collections/the-tree-of-life-paintings"
}: ProductCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block group relative w-full h-full flex flex-col font-sans cursor-pointer bg-transparent overflow-visible">
       {/* Premium Image Container */}
       <div className="relative w-full h-[65%] sm:h-[70%] bg-[#0a0a0a] rounded-[2px] overflow-hidden shadow-[0_4px_40px_rgba(255,255,255,0.02)] border border-white/5 z-10">
         
         <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

         <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 35vw, 25vw"
            className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
         />

         {/* Wishlist Glass Button */}
         <div className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/70 opacity-0 tracking-widest translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-500 ease-out flex items-center justify-center">
           <Heart className="w-4 h-4" />
         </div>

         {/* Reveal "Examine Detail" on hover */}
         <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-75">
            <span className="text-white text-[9px] uppercase tracking-[0.3em] font-medium border border-white/20 px-6 py-3 rounded-full bg-black/20 backdrop-blur-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Examine Detail
            </span>
         </div>
       </div>

       {/* Editorial Typography & Metadata */}
       <div className="flex flex-col flex-1 pt-6 px-1 z-0 relative">
         {/* Subtle dividing line that grows on hover */}
         <div className="absolute top-0 left-1 right-1 h-[1px] bg-white/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />

         <div className="flex justify-between items-baseline mb-3">
           <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-mono">
             Made to Order
           </span>
           <span className="text-[9px] text-white/30 tracking-widest font-mono">
             {size}
           </span>
         </div>

         <h3 className="text-lg sm:text-xl font-light text-white/80 leading-[1.3] mb-2 group-hover:text-white transition-colors duration-500 line-clamp-2 pr-4">
           {title}
         </h3>

         <div className="flex items-center gap-2 mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
           <span className="text-[11px] sm:text-xs text-white/50 tracking-wide font-light">By {artist}</span>
           <BadgeCheck className="w-3.5 h-3.5 text-white/40" />
         </div>

         {/* CTA & Price Footer */}
         <div className="mt-auto flex items-end justify-between pb-2">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">Acquisition</span>
              <div className="flex items-baseline gap-2">
                <span className="text-base sm:text-lg font-normal text-white/90 tracking-tight">{price}</span>
                <span className="text-[9px] text-white/40 tracking-wider whitespace-nowrap">or {emi}</span>
              </div>
            </div>

            <div className="group/btn relative overflow-hidden h-9 px-5 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/40 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center whitespace-nowrap">
                <span className="relative z-10 text-[9px] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                    Acquire 
                    <ArrowRight className="w-3 h-3 -translate-x-1 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-500" />
                </span>
            </div>
         </div>
       </div>

    </a>
  );
}
