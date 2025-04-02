// File: src/components/Model.jsx
import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'

export function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/my-model.glb')
  
  // Add state to track scroll percentage
  const [scrollPercentage, setScrollPercentage] = useState(0)
  
  
  //CHANGE THE PERCENTAGE OF HEIGHT OF BROWSER HERE
  // Track scroll position
  useEffect(() => {
    // Function to update scroll percentage
    const handleScroll = () => {
      // Get scroll position as percentage of page height
      const scrollPosition = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const percentage = scrollPosition / docHeight
      setScrollPercentage(Math.min(1, Math.max(0, percentage)))
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Initialize scroll percentage
    handleScroll()
    
    // Clean up event listener
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useFrame((state, delta) => {
    if(group.current){
      // Base wobble animation
      const wobble = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      
      // Create a curved trajectory using math functions
      // As we scroll, the model moves closer (z-axis) and downward (y-axis)
      
      // Z-axis movement (depth) - starts far away, moves closer
      const initialZOffset = -8
      const zMovement = 9 * scrollPercentage
      
      // Y-axis movement (vertical) - creates the curved path
      // Using a parabolic curve that peaks at the middle of the scroll
      // and ends at a lower position
      const curveHeight = 1.5 // Maximum height of the curve
      const yMovement = -curveHeight * Math.pow(2 * scrollPercentage - 1, 2) + curveHeight
      
      // Additional downward offset that increases as we scroll
      // This makes the end position significantly lower
      const endingDrop = -4 * Math.pow(scrollPercentage, 2)
      
      // Apply both movements plus the wobble animation
      group.current.position.z = wobble + zMovement + initialZOffset
      group.current.position.y = yMovement + endingDrop
    }
  })
  
  return (
    <group ref={group} {...props} dispose={null}>
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