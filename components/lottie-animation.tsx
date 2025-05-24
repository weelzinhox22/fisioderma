"use client"

import { useEffect, useRef, useState } from "react"
import Lottie from "lottie-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Placeholder para a animação Lottie
const placeholderAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  nm: "Placeholder Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [200, 200, 0], ix: 2, l: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 },
        s: {
          a: 1,
          k: [
            {
              i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
              o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
              t: 0,
              s: [100, 100, 100],
            },
            {
              i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
              o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
              t: 30,
              s: [150, 150, 100],
            },
            { t: 60, s: [100, 100, 100] },
          ],
          ix: 6,
          l: 2,
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [100, 100], ix: 2 },
              p: { a: 0, k: [0, 0], ix: 3 },
              nm: "Ellipse Path 1",
              mn: "ADBE Vector Shape - Ellipse",
              hd: false,
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.22, 0.69, 0.67, 1], ix: 4 },
              o: { a: 0, k: 100, ix: 5 },
              r: 1,
              bm: 0,
              nm: "Fill 1",
              mn: "ADBE Vector Graphic - Fill",
              hd: false,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0], ix: 2 },
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              r: { a: 0, k: 0, ix: 6 },
              o: { a: 0, k: 100, ix: 7 },
              sk: { a: 0, k: 0, ix: 4 },
              sa: { a: 0, k: 0, ix: 5 },
              nm: "Transform",
            },
          ],
          nm: "Ellipse 1",
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
  markers: [],
}

export function LottieAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationData, setAnimationData] = useState(placeholderAnimation)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Técnicas Animadas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visualize técnicas e procedimentos através de animações interativas.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <Lottie animationData={animationData} loop={true} />
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold">Drenagem Linfática</h3>
            <p className="text-gray-600 mt-2">
              Técnica que estimula o sistema linfático a trabalhar de forma mais eficiente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
