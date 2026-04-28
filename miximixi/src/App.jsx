import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import RestaurantSelector from './components/RestaurantSelector'

function MultiLayerStars() {
  const starsRef1 = useRef()
  const starsRef2 = useRef()
  const starsRef3 = useRef()
  
  useFrame((state) => {
    if (starsRef1.current) {
      starsRef1.current.rotation.y += 0.0001
      starsRef1.current.rotation.x += 0.00005
    }
    if (starsRef2.current) {
      starsRef2.current.rotation.y += 0.0002
      starsRef2.current.rotation.x += 0.0001
    }
    if (starsRef3.current) {
      starsRef3.current.rotation.y += 0.0003
      starsRef3.current.rotation.x += 0.00015
    }
  })
  
  return (
    <>
      <Stars 
        ref={starsRef1}
        radius={100}
        depth={50}
        count={1500}
        factor={6}
        saturation={0}
        fade
        speed={1}
      />
      <Stars 
        ref={starsRef2}
        radius={150}
        depth={80}
        count={1000}
        factor={8}
        saturation={0}
        fade
        speed={1.5}
      />
      <Stars 
        ref={starsRef3}
        radius={200}
        depth={120}
        count={500}
        factor={12}
        saturation={0}
        fade
        speed={2}
      />
    </>
  )
}

function App() {
  return (
    <div className="app-container">
      {/* 3D星空背景 */}
      <div className="starfield-container">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <MultiLayerStars />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
            />
          </EffectComposer>
        </Canvas>
      </div>
      
      {/* 头部 */}
      <header className="app-header">
        <h1 className="app-title">
          <img src="/assets/images/title.png" alt="咪西咪西" className="app-title-icon" />
          咪西咪西
        </h1>
        <p className="app-subtitle">快选！老娘快饿死了！</p>
      </header>

      {/* 主要内容区域 */}
      <RestaurantSelector />
    </div>
  )
}

export default App
