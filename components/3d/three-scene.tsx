"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, Text, Float, Html } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import type * as THREE from "three"

function Model({ position = [0, 0, 0], scale = 1, onClick }: any) {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = Math.sin(t / 2) / 10
    ref.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <motion.mesh
      ref={ref}
      position={position}
      scale={scale}
      onClick={onClick}
      whileHover={{ scale: scale * 1.1 }}
      whileTap={{ scale: scale * 0.9 }}
    >
      <primitive object={scene} />
    </motion.mesh>
  )
}

function FloatingCard({ position, rotation, children }: any) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Html transform position={position} rotation={rotation} distanceFactor={10} center className="w-64 h-auto">
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">{children}</div>
      </Html>
    </Float>
  )
}

function Scene() {
  const [clicked, setClicked] = useState(false)
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Model position={[0, -1, 0]} scale={1.5} onClick={() => setClicked(!clicked)} />

      <Text
        position={[0, 1.5, 0]}
        fontSize={0.5}
        color="#38b2ac"
        font="/fonts/Geist_Bold.json"
        anchorX="center"
        anchorY="middle"
      >
        Fisioterapia Dermatofuncional
      </Text>

      {clicked && (
        <FloatingCard position={[2, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
          <h3 className="text-lg font-bold mb-2">Tratamentos Avançados</h3>
          <p className="text-sm text-gray-600 mb-3">
            Conheça nossas técnicas inovadoras para tratamentos dermatofuncionais.
          </p>
          <Button size="sm" className="w-full bg-teal-500 hover:bg-teal-600">
            Saiba mais
          </Button>
        </FloatingCard>
      )}

      <OrbitControls enableZoom={false} />
      <Environment preset="sunset" />
    </>
  )
}

export function ThreeSceneContent() {
  return (
    <div className="w-full h-[500px] bg-gradient-to-b from-teal-50 to-purple-50">
      <MotionConfig transition={{ duration: 0.5 }}>
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </MotionConfig>
    </div>
  )
}
