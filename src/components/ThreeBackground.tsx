import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Scene objects — all colored to match Electric Night palette ── */
function SceneContent({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef  = useRef<THREE.Mesh>(null);
  const torus2Ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  const particleCount = isMobile ? 100 : 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [particleCount]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth mouse parallax
    state.camera.position.x += (mouse.x * 1.0 - state.camera.position.x) * 0.035;
    state.camera.position.y += (mouse.y * 1.0 - state.camera.position.y) * 0.035;
    state.camera.lookAt(0, 0, 0);

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.016;
      pointsRef.current.rotation.x = t * 0.008;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.07;
      sphereRef.current.rotation.x = t * 0.03;
      sphereRef.current.position.y = Math.sin(t * 0.45) * 0.22;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.09;
      torusRef.current.rotation.y = t * 0.045;
      torusRef.current.position.y = Math.cos(t * 0.38) * 0.18;
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.x = -t * 0.07;
      torus2Ref.current.rotation.z =  t * 0.055;
      torus2Ref.current.position.x = Math.sin(t * 0.28) * 0.12;
    }
  });

  /* Electric Cyan = #22D3EE | Indigo Glow = #818CF8 */
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6,  6, 6]} intensity={1.8} color="#22D3EE" />
      <pointLight      position={[-6,-6,-6]} intensity={1.2} color="#818CF8" />
      <pointLight      position={[0,  8, 4]} intensity={0.7} color="#22D3EE" />

      {/* Wireframe sphere — Cyan */}
      <mesh ref={sphereRef} position={[-1.5, 0.1, 0]}>
        <sphereGeometry args={[0.78, 18, 18]} />
        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.20} />
      </mesh>

      {/* Primary torus — Indigo */}
      <mesh ref={torusRef} position={[1.5, 0, -0.5]}>
        <torusGeometry args={[0.72, 0.18, 14, 42]} />
        <meshStandardMaterial
          color="#818CF8"
          roughness={0.1}
          metalness={0.95}
          wireframe
          transparent
          opacity={0.24}
        />
      </mesh>

      {/* Secondary torus — Cyan accent */}
      <mesh ref={torus2Ref} position={[0.2, 1.3, -1]}>
        <torusGeometry args={[0.42, 0.1, 10, 30]} />
        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.16} />
      </mesh>

      {/* Particle field — Cyan */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.03 : 0.05}
          color="#22D3EE"
          sizeAttenuation
          transparent
          opacity={0.50}
        />
      </points>
    </>
  );
}

export const ThreeBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <SceneContent isMobile={isMobile} />
      </Canvas>

      {/* Cyan blob — top right */}
      <div
        className="absolute top-[5%] right-[5%] w-[30rem] h-[30rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      {/* Indigo blob — bottom left */}
      <div
        className="absolute bottom-[5%] left-[5%] w-[30rem] h-[30rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
    </div>
  );
};

export default ThreeBackground;
