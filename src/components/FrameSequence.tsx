"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function FrameSequence({ onComplete }: { onComplete?: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    const frameCount = 120;
    const currentFrame = (index: number) =>
        `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const images = useRef<HTMLImageElement[]>([]);
    const sequence = useRef({ frame: 0 });

    useEffect(() => {
        // Preload images
        let loadedCount = 0;
        for (let i = 0; i < frameCount; i++) {
            const img = new window.Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / frameCount) * 100));
                if (loadedCount === frameCount) {
                    setLoaded(true);
                }
            };
            // In case of error, still increment to avoid getting stuck
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === frameCount) setLoaded(true);
            };
            images.current.push(img);
        }
    }, []);

    useEffect(() => {
        if (!loaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Set canvas dimensions
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        };

        window.addEventListener("resize", updateCanvasSize);
        updateCanvasSize(); // Initial setup

        function render() {
            if (!context || !canvas) return;
            const img = images.current[sequence.current.frame];
            if (!img) return;

            // Draw image covering the canvas (object-fit: cover equivalent)
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        }

        // Give a small delay before playback starts for cinematic effect
        const delay = setTimeout(() => {
            // Playback timeline (15fps)
            const tl = gsap.timeline({
                onUpdate: render,
                onComplete: () => {
                    gsap.to(containerRef.current, {
                        opacity: 0,
                        scale: 1.05,
                        duration: 1.8,
                        ease: "power2.inOut",
                        onComplete: () => {
                            if (onComplete) onComplete();
                        }
                    });
                }
            });

            tl.to(sequence.current, {
                frame: frameCount - 1,
                snap: "frame",
                duration: frameCount / 15,
                ease: "none"
            });
        }, 500);

        return () => {
            clearTimeout(delay);
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, [loaded, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center pointer-events-none origin-center"
        >
            {!loaded && (
                <div className="absolute z-10 flex flex-col items-center gap-4">
                    <div className="text-white/40 text-xs tracking-[0.4em] font-mono uppercase">
                        Loading Sequence
                    </div>
                    <div className="text-white text-sm tracking-[0.2em] font-mono">
                        {progress.toString().padStart(3, "0")}%
                    </div>
                </div>
            )}
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
