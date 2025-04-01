// File: src/components/3D/Model.jsx
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/my-model.glb')
  
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