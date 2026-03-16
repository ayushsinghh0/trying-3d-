"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-50" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
                dpr={[1, 2]} // Support high device pixel ratio
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                {/* Environment map for realistic lighting when 3D assets are dropped in */}
                <Environment preset="city" />

                {/* 
          This canvas serves as the spatial foundation for the site. 
          Future 3D assets, meshes, or text elements mapped to 3D planes 
          can be rendered here, while blending perfectly with the DOM below.
        */}
            </Canvas>
        </div>
    );
}
