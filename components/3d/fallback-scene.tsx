"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function FallbackScene() {
  return (
    <div className="w-full py-16 bg-gradient-to-b from-teal-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-teal-700">Visualização 3D Interativa</h2>
            <p className="text-lg text-gray-700 mb-6">
              Nossa plataforma oferece visualizações tridimensionais para melhor compreensão das técnicas e
              procedimentos em fisioterapia dermatofuncional.
            </p>
            <Button className="bg-teal-500 hover:bg-teal-600">Explorar Recursos</Button>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-80 h-80 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-purple-100/50 rounded-full" />
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Visualização 3D"
                width={300}
                height={300}
                className="relative z-10 transform hover:scale-110 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
