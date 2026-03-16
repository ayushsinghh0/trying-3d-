"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";

export default function FloatingGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // Pin the container and animate the panels horizontally or in Z-space
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
            }
        });

        // Make the panels translate X and scale to simulate depth
        tl.to(panelsRef.current, {
            xPercent: -100 * (panelsRef.current.length - 1),
            ease: "none",
        });

        // Parallax effect on images inside panels
        panelsRef.current.forEach((panel, i) => {
            if (!panel) return;
            const img = panel.querySelector("img");
            if (img) {
                gsap.to(img, {
                    xPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=300%",
                        scrub: 1,
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const items = [
        {
            title: "The Tales of Nature: Tree of Life with Peacocks in Kalamkari by Siva Reddy",
            size: "40 in X 30 in",
            artist: "Siva Reddy",
            price: "₹30,000",
            emi: "₹3891/Month",
            image: "/products/1._The_Tales_of_Nature_Tree_of_Life_with_Peacocks_in_Kalamkari_by_Siva_Reddy_900x.webp",
            link: "https://www.memeraki.com/collections/the-tree-of-life-paintings"
        },
        {
            title: "Tree of Life Phad Painting by Kalyan Joshi",
            size: "Made To Order",
            artist: "Kalyan Joshi",
            price: "₹58,000",
            emi: "₹7523/Month",
            image: "/products/Tree-of-Life-Phad-Painting-by-Kalyan-Joshi-1796_900x.webp",
            link: "https://www.memeraki.com/collections/the-tree-of-life-paintings"
        },
        {
            title: "LIVING ROOTS, SHARED HARVESTS KALAMKARI ZARDOZI ARTWORK BY SUDHEER AND MD. BILAL",
            size: "102 in X 70 in",
            artist: "Sudheer and Md. Bilal",
            price: "₹450,000",
            emi: "₹58359/Month",
            image: "/products/1._LIVING_ROOTS_SHARED_HARVESTS_KALAMKARI_ZARDOZI_ARTWORK_BY_SUDHEER_AND_MD._BILAL_900x.webp",
            link: "https://www.memeraki.com/collections/the-tree-of-life-paintings"
        },
        {
            title: "Tree of Life in Mata ni Pachedi by Vasant Manubhai Chitara",
            size: "48 in X 36 in",
            artist: "Vasant Manubhai Chitara",
            price: "₹50,000",
            emi: "₹6486/Month",
            image: "/products/1._Tree_of_Life_in_Mata_ni_Pached_900x.webp",
            link: "https://www.memeraki.com/collections/the-tree-of-life-paintings"
        },
        {
            title: "Tree Of life in in Mata ni pachedi by Bhanu Bhai Chittara",
            size: "21.5 in X 14.5 in",
            artist: "Bhanu Bhai Chittara",
            price: "₹11,000",
            emi: "₹1427/Month",
            image: "/products/1._Tree_Of_life_in_in_Mata_ni_pachedi_900x.webp",
            link: "https://www.memeraki.com/collections/the-tree-of-life-paintings"
        },
        {
            title: "Tree Of life in in Mata ni pachedi by Bhanu Bhai Chittara",
            size: "21.5 in X 14.5 in",
            artist: "Bhanu Bhai Chittara",
            price: "₹11,000",
            emi: "₹1427/Month",
            image: "/products/1._Tree_in_in_Mata_ni_pachedi_by_Bhanu_Bhai_Chittara_900x.webp",
            link: "https://www.memeraki.com/collections/the-tree-of-life-paintings"
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center">
            <div className="absolute top-12 left-12 mix-blend-difference z-20">
                <h2 className="text-xl md:text-3xl font-medium tracking-tight uppercase">
                    Exploration
                </h2>
                <p className="text-white/50 text-xs tracking-widest mt-2 uppercase">Gallery Archive</p>
            </div>

            <div className="flex pl-[10vw]">
                {items.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            panelsRef.current[i] = el;
                        }}
                        className="relative w-[85vw] md:w-[35vw] lg:w-[25vw] h-[65vh] flex-shrink-0 mr-12 lg:mr-24 items-center flex"
                    >
                        <ProductCard 
                          title={item.title}
                          size={item.size}
                          artist={item.artist}
                          price={item.price}
                          emi={item.emi}
                          imageSrc={item.image}
                          link={item.link}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
