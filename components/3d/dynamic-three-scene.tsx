"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Carregamento dinâmico do componente ThreeScene sem SSR
const ThreeSceneContent = dynamic(() => import("./three-scene").then((mod) => ({ default: mod.ThreeSceneContent })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gradient-to-b from-teal-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-teal-700">Carregando cena 3D...</p>
      </div>
    </div>
  ),
})

export function ThreeScene() {
  return (
    <Suspense fallback={null}>
      <ThreeSceneContent />
    </Suspense>
  )
}
