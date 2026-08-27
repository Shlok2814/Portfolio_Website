"use client";

import React, { useRef, useState, useEffect, useMemo, Component, ErrorInfo, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// ============================================================================
// 1. Error Boundary for Three.js / WebGL Context Failures
// ============================================================================
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
  onError?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("WebGL Renderer initialization failed, falling back to CSS 3D Cube:", error, errorInfo);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ============================================================================
// 2. Safe WebGL Detection Utility
// ============================================================================
function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl && (gl instanceof WebGLRenderingContext || (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext)));
  } catch {
    return false;
  }
}

// ============================================================================
// 3. Three.js Rubik's Grid (WebGL Version)
// ============================================================================
interface RubikCubeProps {
  accentColor: string;
  isHovered: boolean;
}

function RubikGrid({ accentColor, isHovered }: RubikCubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetSpeed = useRef({ x: 0.004, y: 0.007 });

  const subCubes = useMemo(() => {
    const cubes: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          cubes.push([x * 0.72, y * 0.72, z * 0.72]);
        }
      }
    }
    return cubes;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const speedMultiplier = isHovered ? 3.5 : 1.0;
    groupRef.current.rotation.x += targetSpeed.current.x * speedMultiplier;
    groupRef.current.rotation.y += targetSpeed.current.y * speedMultiplier;
  });

  return (
    <group ref={groupRef} rotation={[0.45, 0.6, 0]}>
      {subCubes.map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>
          <mesh>
            <boxGeometry args={[0.66, 0.66, 0.66]} />
            <meshStandardMaterial
              color="#0e0e0e"
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.92}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.665, 0.665, 0.665)]} />
            <lineBasicMaterial color={accentColor} linewidth={1.5} transparent opacity={0.95} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 4. CSS 3D Rubik's Isometric Cube (Zero-WebGL Fallback)
// ============================================================================
function CSS3DRubikCube({ accentColor, isHovered }: { accentColor: string; isHovered: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center [perspective:1000px] select-none">
      <motion.div
        animate={{
          rotateX: [20, 35, 20],
          rotateY: [0, 360],
          rotateZ: [5, -5, 5],
        }}
        transition={{
          rotateY: {
            repeat: Infinity,
            duration: isHovered ? 6 : 18,
            ease: "linear",
          },
          rotateX: {
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          },
          rotateZ: {
            repeat: Infinity,
            duration: 9,
            ease: "easeInOut",
          },
        }}
        className="relative w-44 h-44 sm:w-52 sm:h-52 [transform-style:preserve-3d]"
      >
        {/* Render 3x3x3 grid of subcubes in CSS 3D */}
        {[-1, 0, 1].map((x) =>
          [-1, 0, 1].map((y) =>
            [-1, 0, 1].map((z) => {
              if (x === 0 && y === 0 && z === 0) return null;
              const size = 52;
              const gap = 58;
              const tx = x * gap;
              const ty = y * gap;
              const tz = z * gap;
              const half = size / 2;

              return (
                <div
                  key={`${x}-${y}-${z}`}
                  className="absolute top-1/2 left-1/2 -mt-[26px] -ml-[26px] [transform-style:preserve-3d]"
                  style={{
                    transform: `translate3d(${tx}px, ${ty}px, ${tz}px)`,
                  }}
                >
                  {/* Front Face */}
                  <div
                    className="absolute w-[52px] h-[52px] rounded-lg bg-[#0e0e12]/90 border transition-colors duration-300"
                    style={{
                      transform: `translateZ(${half}px)`,
                      borderColor: accentColor,
                      boxShadow: `0 0 12px ${accentColor}25, inset 0 0 8px rgba(0,0,0,0.8)`,
                    }}
                  />
                  {/* Back Face */}
                  <div
                    className="absolute w-[52px] h-[52px] rounded-lg bg-[#0a0a0d]/90 border transition-colors duration-300"
                    style={{
                      transform: `rotateY(180deg) translateZ(${half}px)`,
                      borderColor: accentColor,
                      boxShadow: `0 0 12px ${accentColor}25, inset 0 0 8px rgba(0,0,0,0.8)`,
                    }}
                  />
                  {/* Left Face */}
                  <div
                    className="absolute w-[52px] h-[52px] rounded-lg bg-[#0c0c10]/90 border transition-colors duration-300"
                    style={{
                      transform: `rotateY(-90deg) translateZ(${half}px)`,
                      borderColor: accentColor,
                      boxShadow: `0 0 12px ${accentColor}25, inset 0 0 8px rgba(0,0,0,0.8)`,
                    }}
                  />
                  {/* Right Face */}
                  <div
                    className="absolute w-[52px] h-[52px] rounded-lg bg-[#111116]/90 border transition-colors duration-300"
                    style={{
                      transform: `rotateY(90deg) translateZ(${half}px)`,
                      borderColor: accentColor,
                      boxShadow: `0 0 12px ${accentColor}25, inset 0 0 8px rgba(0,0,0,0.8)`,
                    }}
                  />
                  {/* Top Face */}
                  <div
                    className="absolute w-[52px] h-[52px] rounded-lg bg-[#14141a]/90 border transition-colors duration-300"
                    style={{
                      transform: `rotateX(90deg) translateZ(${half}px)`,
                      borderColor: accentColor,
                      boxShadow: `0 0 12px ${accentColor}25, inset 0 0 8px rgba(0,0,0,0.8)`,
                    }}
                  />
                  {/* Bottom Face */}
                  <div
                    className="absolute w-[52px] h-[52px] rounded-lg bg-[#08080a]/90 border transition-colors duration-300"
                    style={{
                      transform: `rotateX(-90deg) translateZ(${half}px)`,
                      borderColor: accentColor,
                      boxShadow: `0 0 12px ${accentColor}25, inset 0 0 8px rgba(0,0,0,0.8)`,
                    }}
                  />
                </div>
              );
            })
          )
        )}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 5. Main Export Component with Robust Fallbacks
// ============================================================================
interface InteractiveCubeProps {
  accentColor?: string;
  className?: string;
}

export function InteractiveCube({
  accentColor = "#0070F3",
  className = "w-full h-[320px] sm:h-[380px]",
}: InteractiveCubeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLAvailable(checkWebGLSupport());
  }, []);

  const cssFallback = <CSS3DRubikCube accentColor={accentColor} isHovered={isHovered} />;

  return (
    <div
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {webGLAvailable === false ? (
        cssFallback
      ) : webGLAvailable === true ? (
        <WebGLErrorBoundary fallback={cssFallback} onError={() => setWebGLAvailable(false)}>
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            gl={{ alpha: true, antialias: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
            className="w-full h-full"
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 10]} intensity={1.8} />
            <directionalLight position={[-10, -10, -5]} intensity={0.6} color={accentColor} />

            <PresentationControls
              global={false}
              cursor={true}
              snap={true}
              speed={2.2}
              zoom={1}
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 2, Math.PI / 2]}
            >
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <RubikGrid accentColor={accentColor} isHovered={isHovered} />
              </Float>
            </PresentationControls>
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        cssFallback
      )}
    </div>
  );
}
