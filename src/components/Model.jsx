// when the user scrolls down, i would like the model to move nearer to the browser window aka get bigger (zoom closer), and when the user scrolls back up, the model moves back to the originla position (zoom out)



// File: src/components/3D/Model.jsx
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'

export function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/my-model.glb')

  useFrame((state, delta) => {
    if(group.current){
      group.current.position.z = Math.sin(state.clock.elapsedTime) * 3;
    }
  })
  
  return (
    <group ref={group} {...props} dispose={null}>
      {/* This matches your GLB structure with the geometry_0 mesh */}
      <mesh
        geometry={nodes.geometry_0.geometry}
        material={nodes.geometry_0.material}
        position={nodes.geometry_0.position}
        rotation={nodes.geometry_0.rotation}
        scale={nodes.geometry_0.scale}
      />
    </group>
  )
}

// Preload the model
useGLTF.preload('/models/my-model.glb')