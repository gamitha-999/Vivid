'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile } from '@/hooks/useMediaQuery'

function FloatingCard({ position, rotation, color, index }: {
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { pointer } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.3 + index) * 0.05
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.4 + index) * 0.05
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + index * 2) * 0.1
    meshRef.current.position.x = position[0] + pointer.x * 0.08 * (index + 1)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <planeGeometry args={[1.4, 1.9]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          distort={0.1}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null!)

  const cards = useMemo(() => [
    { position: [-2.2, 0.5, 0], rotation: [0.1, 0.2, 0], color: '#4a90d9', index: 0 },
    { position: [2.2, -0.3, 0.5], rotation: [-0.1, -0.15, 0.05], color: '#7c3aed', index: 1 },
    { position: [0, 1.2, -0.5], rotation: [0.05, 0, 0.1], color: '#db2777', index: 2 },
    { position: [-1.5, -0.8, 0.8], rotation: [0.15, -0.1, -0.05], color: '#0891b2', index: 3 },
    { position: [1.5, 0.8, -0.3], rotation: [-0.05, 0.1, 0], color: '#65a30d', index: 4 },
  ], [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#0071e3" />
      <pointLight position={[0, 3, 2]} intensity={0.8} color="#4a90d9" />

      {cards.map(({ position, rotation, color, index }) => (
        <FloatingCard key={index} position={position as [number, number, number]} rotation={rotation as [number, number, number]} color={color} index={index} />
      ))}
    </group>
  )
}

export default function Hero3D() {
  const isMobile = useIsMobile()

  if (isMobile) return null

  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] min-h-[300px] md:min-h-[400px] max-h-[500px] md:max-h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
