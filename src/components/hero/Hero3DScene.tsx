'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows, RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 1. Flowing Interconnected Time Ribbon
function TimeRibbon({
  radius = 2.4,
  tube = 0.09,
  colorA = '#4169FF',
  colorB = '#7357FF',
  speed = 0.3,
  rotation = [0, 0, 0] as [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
    }
  });

  return (
    <group rotation={rotation}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, tube, 32, 128]} />
        <meshPhysicalMaterial
          color={colorA}
          emissive={colorB}
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

// 2. Floating Translucent Chronometer / Precision Clock
function PrecisionClock({ position }: { position: [number, number, number] }) {
  const clockRef = useRef<THREE.Group>(null);
  const handRef = useRef<THREE.Mesh>(null);
  const subHandRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (handRef.current) {
      handRef.current.rotation.z = -state.clock.elapsedTime * 1.5;
    }
    if (subHandRef.current) {
      subHandRef.current.rotation.z = -state.clock.elapsedTime * 0.4;
    }
    if (clockRef.current) {
      clockRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15 + 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={clockRef} position={position}>
        {/* Outer Titanium Bezel */}
        <mesh castShadow>
          <cylinderGeometry args={[0.78, 0.78, 0.1, 48]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Glowing Neon Ring */}
        <mesh position={[0, 0, 0.055]}>
          <ringGeometry args={[0.7, 0.75, 48]} />
          <meshBasicMaterial color="#45DFFF" toneMapped={false} />
        </mesh>

        {/* Translucent Frosted Glass Face */}
        <mesh position={[0, 0, 0.06]}>
          <circleGeometry args={[0.7, 48]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.85}
            roughness={0.15}
            ior={1.5}
            reflectivity={0.9}
            clearcoat={1}
          />
        </mesh>

        {/* 12 Hour Index Markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          const isQuarter = i % 3 === 0;
          return (
            <mesh
              key={i}
              position={[Math.sin(angle) * 0.58, Math.cos(angle) * 0.58, 0.065]}
              rotation={[0, 0, -angle]}
            >
              <boxGeometry args={[0.025, isQuarter ? 0.12 : 0.06, 0.01]} />
              <meshBasicMaterial color={isQuarter ? '#4169FF' : '#94A3B8'} />
            </mesh>
          );
        })}

        {/* Central Pivot Hub */}
        <mesh position={[0, 0, 0.075]}>
          <cylinderGeometry args={[0.06, 0.06, 0.03, 24]} />
          <meshStandardMaterial color="#4169FF" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Sweeping Blue Chrono Hand */}
        <mesh ref={handRef} position={[0, 0.2, 0.08]}>
          <boxGeometry args={[0.02, 0.45, 0.008]} />
          <meshBasicMaterial color="#45DFFF" toneMapped={false} />
        </mesh>

        {/* Violet Hour Hand */}
        <mesh ref={subHandRef} position={[0, 0.14, 0.075]}>
          <boxGeometry args={[0.03, 0.3, 0.008]} />
          <meshBasicMaterial color="#7357FF" />
        </mesh>
      </group>
    </Float>
  );
}

// 3. Floating Light Energy Particles
function EnergyDust({ count = 35 }) {
  const points = useMemo(() => {
    const p: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      p.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5 + 0.5,
        (Math.random() - 0.5) * 4
      ]);
    }
    return p;
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.035 + (idx % 3) * 0.015, 12, 12]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? '#45DFFF' : '#7357FF'}
            transparent
            opacity={0.8}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// 4. Integrated Floating Glass Architectural Slab
function ArchitecturalGlassSlab({
  position,
  rotation,
  title,
  sub
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  sub: string;
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[1.5, 0.52, 0.04]} radius={0.08} smoothness={4} castShadow>
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.82}
            roughness={0.12}
            ior={1.45}
            clearcoat={1}
            reflectivity={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        {/* Luminous border highlight */}
        <mesh position={[0, -0.22, 0.025]}>
          <boxGeometry args={[1.3, 0.015, 0.01]} />
          <meshBasicMaterial color="#45DFFF" toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

export function Hero3DScene() {
  const scenePivot = useRef<THREE.Group>(null);
  const qGroup = useRef<THREE.Group>(null);
  const arrowGroup = useRef<THREE.Group>(null);
  const arrowGlowRef = useRef<THREE.Mesh>(null);

  // Smooth cinematic mouse parallax
  useFrame((state) => {
    const mouseX = state.pointer.x * 0.35;
    const mouseY = state.pointer.y * 0.22;

    if (scenePivot.current) {
      scenePivot.current.rotation.y = THREE.MathUtils.lerp(
        scenePivot.current.rotation.y,
        mouseX * 0.45 + 0.15,
        0.04
      );
      scenePivot.current.rotation.x = THREE.MathUtils.lerp(
        scenePivot.current.rotation.x,
        -mouseY * 0.35 + 0.08,
        0.04
      );
    }

    if (qGroup.current) {
      qGroup.current.position.y = 0.15 + Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
      qGroup.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }

    if (arrowGroup.current) {
      arrowGroup.current.position.z = Math.sin(state.clock.elapsedTime * 1.8) * 0.22 + 0.2;
    }

    if (arrowGlowRef.current) {
      const pulse = 2.5 + Math.sin(state.clock.elapsedTime * 3) * 0.8;
      (arrowGlowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={scenePivot} position={[0.35, -0.15, 0]}>
      {/* Studio Lighting */}
      <ambientLight intensity={1.1} />

      {/* Primary Key Light */}
      <directionalLight
        position={[6, 9, 6]}
        intensity={2.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        color="#FFFFFF"
      />

      {/* Electric Blue Rim Light (Back-Left) */}
      <pointLight position={[-6, 4, -4]} color="#45DFFF" intensity={6} distance={15} />

      {/* Royal Violet Fill Light (Back-Right) */}
      <pointLight position={[5, -2, -3]} color="#7357FF" intensity={5} distance={14} />

      {/* Bottom Soft Fill */}
      <pointLight position={[0, -4, 3]} color="#4169FF" intensity={2} distance={10} />

      {/* Environment preset for reflections */}
      <Environment preset="city" />

      {/* ============================================================== */}
      {/* 1. THE ENORMOUS SCULPTED 'Q' (CENTERPIECE) */}
      {/* ============================================================== */}
      <group ref={qGroup} position={[0, 0.15, 0]}>
        
        {/* Main Q Loop: Monumental White Ceramic Torus */}
        <mesh castShadow receiveShadow rotation={[0.25, 0.18, 0]}>
          <torusGeometry args={[2.0, 0.52, 48, 128]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.08}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            reflectivity={0.95}
            iridescence={0.3}
            iridescenceIOR={1.4}
          />
        </mesh>

        {/* Concentric Inner Luminous Cyan Ring (Inlaid Bevel) */}
        <mesh rotation={[0.25, 0.18, 0]}>
          <torusGeometry args={[1.48, 0.055, 32, 100]} />
          <meshStandardMaterial
            color="#45DFFF"
            emissive="#45DFFF"
            emissiveIntensity={2.5}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Outer Brushed Aluminum Rim Chamfer */}
        <mesh rotation={[0.25, 0.18, 0]}>
          <torusGeometry args={[2.45, 0.035, 24, 128]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* Inner Violet Specular Accents */}
        <mesh rotation={[0.25, 0.18, 0]}>
          <torusGeometry args={[1.98, 0.02, 16, 96]} />
          <meshStandardMaterial
            color="#7357FF"
            emissive="#7357FF"
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* The Q's Monumental Diagonal Base Tail (Extruded Pillar) */}
        <group position={[1.45, -1.35, 0.35]} rotation={[0.3, 0.15, -0.72]}>
          {/* Main Ceramic Leg */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.34, 0.42, 1.6, 32]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              roughness={0.1}
              metalness={0.05}
              clearcoat={1.0}
            />
          </mesh>

          {/* Brushed Aluminum End Bevel */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.43, 0.45, 0.12, 32]} />
            <meshStandardMaterial
              color="#CBD5E1"
              metalness={0.92}
              roughness={0.2}
            />
          </mesh>

          {/* Glowing Seam Line */}
          <mesh position={[0, 0, 0.36]}>
            <boxGeometry args={[0.04, 1.4, 0.04]} />
            <meshStandardMaterial
              color="#45DFFF"
              emissive="#45DFFF"
              emissiveIntensity={2.8}
            />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 2. THE LUMINOUS SPEED ARROW PIERCING THROUGH THE Q */}
        {/* ============================================================== */}
        <group
          ref={arrowGroup}
          position={[0.35, -0.1, 0.2]}
          rotation={[0.18, -0.32, 0.58]}
        >
          {/* Arrow Head (Dynamic Chevron Form) */}
          <mesh ref={arrowGlowRef} castShadow>
            <coneGeometry args={[0.62, 1.45, 24]} />
            <meshStandardMaterial
              color="#45DFFF"
              emissive="#4169FF"
              emissiveIntensity={3.2}
              roughness={0.1}
              metalness={0.3}
            />
          </mesh>

          {/* Translucent Aerodynamic Outer Sheath */}
          <mesh position={[0, -0.05, 0]}>
            <coneGeometry args={[0.68, 1.55, 24]} />
            <meshPhysicalMaterial
              color="#45DFFF"
              transmission={0.8}
              roughness={0.05}
              ior={1.45}
              transparent
              opacity={0.65}
            />
          </mesh>

          {/* Arrow Shaft (Extending through the core) */}
          <mesh position={[0, -1.05, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 1.2, 24]} />
            <meshStandardMaterial
              color="#4169FF"
              emissive="#45DFFF"
              emissiveIntensity={2.5}
            />
          </mesh>

          {/* Light Core Trail */}
          <mesh position={[0, -1.75, 0]}>
            <cylinderGeometry args={[0.12, 0.04, 0.8, 16]} />
            <meshBasicMaterial color="#7357FF" toneMapped={false} />
          </mesh>
        </group>

      </group>

      {/* ============================================================== */}
      {/* 3. INTERCONNECTED 3D TIME RIBBONS */}
      {/* ============================================================== */}
      <TimeRibbon
        radius={3.1}
        tube={0.08}
        colorA="#4169FF"
        colorB="#45DFFF"
        speed={0.25}
        rotation={[0.4, -0.3, 0.2]}
      />

      <TimeRibbon
        radius={3.4}
        tube={0.06}
        colorA="#7357FF"
        colorB="#4169FF"
        speed={-0.18}
        rotation={[-0.5, 0.4, -0.3]}
      />

      <TimeRibbon
        radius={2.5}
        tube={0.045}
        colorA="#45DFFF"
        colorB="#7357FF"
        speed={0.35}
        rotation={[0.8, 0.6, 0.1]}
      />

      {/* ============================================================== */}
      {/* 4. FLOATING TRANSLUCENT PRECISION CHRONOMETER */}
      {/* ============================================================== */}
      <PrecisionClock position={[2.5, 1.4, -0.4]} />

      {/* ============================================================== */}
      {/* 5. ARCHITECTURALLY INTEGRATED GLASS PANELS */}
      {/* ============================================================== */}
      <ArchitecturalGlassSlab
        position={[-2.4, 1.3, 0.6]}
        rotation={[0.15, 0.35, -0.1]}
        title="QUEUE BYPASS"
        sub="ACTIVE"
      />

      <ArchitecturalGlassSlab
        position={[-2.1, -1.4, 0.8]}
        rotation={[-0.1, 0.4, 0.08]}
        title="TIME SAVED"
        sub="+45 MIN"
      />

      {/* ============================================================== */}
      {/* 6. FLOATING GEOMETRIC CERAMIC & SILVER SCULPTURAL ACCENTS */}
      {/* ============================================================== */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.5}>
        <RoundedBox
          args={[0.48, 0.48, 0.48]}
          radius={0.1}
          smoothness={4}
          position={[-3.2, 0.2, -1.2]}
        >
          <meshPhysicalMaterial
            color="#FFFFFF"
            metalness={0.85}
            roughness={0.15}
            clearcoat={1}
          />
        </RoundedBox>
      </Float>

      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.6}>
        <RoundedBox
          args={[0.38, 0.38, 0.38]}
          radius={0.08}
          smoothness={4}
          position={[3.1, -1.1, -0.6]}
        >
          <meshStandardMaterial
            color="#7357FF"
            emissive="#7357FF"
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.25}
          />
        </RoundedBox>
      </Float>

      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[2.2, -2.1, 1.2]} castShadow>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshPhysicalMaterial
            color="#45DFFF"
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
          />
        </mesh>
      </Float>

      {/* ============================================================== */}
      {/* 7. AMBIENT ENERGY DUST */}
      {/* ============================================================== */}
      <EnergyDust count={40} />

      {/* ============================================================== */}
      {/* 8. LUXURIOUS DEEP CONTACT SHADOWS */}
      {/* ============================================================== */}
      <ContactShadows
        position={[0, -2.8, 0]}
        opacity={0.38}
        scale={18}
        blur={3.6}
        far={5}
        color="#0B0F1F"
      />
    </group>
  );
}
