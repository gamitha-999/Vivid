'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, Environment } from '@react-three/drei'
import * as THREE from 'three'

function ReelImage({ position, index }: {
  position: [number, number, number]
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const rotation: [number, number, number] = [0, 0, 0]

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * 0.5
    const angle = t + index * (Math.PI * 2 / 5)
    const radius = 4
    meshRef.current.position.x = Math.sin(angle) * radius
    meshRef.current.position.z = Math.cos(angle) * radius
    meshRef.current.position.y = position[1] + Math.sin(t * 2 + index) * 0.2
    meshRef.current.lookAt(0, 0, 0)
    meshRef.current.rotation.z = Math.sin(t + index) * 0.05
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[1.6, 2.2]} />
      <meshBasicMaterial
        color="#2a2a2a"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function ReelScene() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.002
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.15}
          color="rgba(255,255,255,0.3)"
          anchorX="center"
          anchorY="middle"
        >
          Drag to explore
        </Text>
      </Float>

      {Array.from({ length: 8 }).map((_, i) => (
        <ReelImage
          key={i}
          position={[0, (i % 2 === 0 ? 0.5 : -0.5), 0]}
          index={i}
        />
      ))}
    </group>
  )
}

export default function PhotoReel3D() {
  return (
    <div className="relative w-full h-[40vh] min-h-[300px] max-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ReelScene />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
