// src/components/ShapeWithImage.jsx

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

/**
 * ShapeWithImage Component
 * 
 * A 3D cube with customizable texture and position.
 * 
 * Props:
 * @param {Object} props - Component props
 * @param {string|import} props.imageTexture - Required. The image to apply to the cube. 
 *        Can be an imported image or a URL string.
 * @param {Array} props.position - Optional. The [x, y, z] position of the cube in 3D space.
 *        Defaults to [0, 0, 0].
 * @param {boolean} props.isContracted - Whether the image should be contracted (showing full image).
 * @param {number} props.index - The index of this shape in the grid.
 * 
 * Usage:
 * <ShapeWithImage imageTexture={importedImage} position={[1, 2, 3]} isContracted={false} index={0} />
 */

const ShapeWithImage = (props) => {
  const { imageTexture, position = [0, 0, 0], isContracted, index } = props;
  const meshRef = useRef();
  const [isRotating, setIsRotating] = useState(!isContracted);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  // Target position for animation
  const targetPosition = useRef(new THREE.Vector3(...position));
  
  // Update target position when props change
  useEffect(() => {
    targetPosition.current.set(position[0], position[1], position[2]);
  }, [position]);
  
  // Create materials array
  const [materials, setMaterials] = useState([
    new THREE.MeshStandardMaterial({ color: 'red' }),         // right
    new THREE.MeshStandardMaterial({ color: 'green' }),       // left
    new THREE.MeshStandardMaterial({ color: 'blue' }),        // top
    new THREE.MeshStandardMaterial({ color: 'yellow' }),      // bottom
    new THREE.MeshStandardMaterial({ color: 'white' }),       // front - placeholder until texture loaded
    new THREE.MeshStandardMaterial({ color: 'magenta' })      // back
  ]);
  
  // Update rotation state when contraction state changes
  useEffect(() => {
    setIsRotating(!isContracted);
  }, [isContracted]);

  // Load texture properly with error handling
  useEffect(() => {
    if (!imageTexture) {
        setError('No image texture provided');
        return;
    }

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';
    
    // Update texture loading to avoid the WebGL warnings
    THREE.ColorManagement.enabled = true;
    
    textureLoader.load(
      imageTexture,
      (loadedTexture) => {
        // Set proper texture parameters to avoid warnings
        loadedTexture.flipY = true; // Fix upside-down images
        loadedTexture.generateMipmaps = true;
        loadedTexture.needsUpdate = true;
        
        // All sides of the cube have the image
        setMaterials(prevMaterials => {
            return prevMaterials.map(() => new THREE.MeshStandardMaterial({
                map: loadedTexture,
                side: THREE.FrontSide
            }));
        });
        
        setTextureLoaded(true);
      },
      undefined, // onProgress callback not needed
      (err) => {
        // On error
        console.error('Error loading texture:', err);
        setError('Failed to load texture');
      }
    );
    
    // Cleanup function
    return () => {
      materials.forEach(material => material.dispose());
    };
  }, [imageTexture]); // re-run when imageTexture changes 
  
  // ANIMATION loop (equivalent to requestAnimationFrame)
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Position animation with smooth lerping
    meshRef.current.position.lerp(targetPosition.current, 0.1);
    
    if (isRotating) {
      // Continue rotating
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    } else {
      // Smoothly reset rotation when not rotating
      meshRef.current.rotation.x *= 0.9;
      meshRef.current.rotation.y *= 0.9;
      meshRef.current.rotation.z *= 0.9;
      
      // When rotation is very small, just set it to zero
      if (Math.abs(meshRef.current.rotation.x) < 0.01) {
        meshRef.current.rotation.x = 0;
      }
      if (Math.abs(meshRef.current.rotation.y) < 0.01) {
        meshRef.current.rotation.y = 0;
      }
      if (Math.abs(meshRef.current.rotation.z) < 0.01) {
        meshRef.current.rotation.z = 0;
      }
    }
  });
  
  // Handle click on this specific cube (stops propagation to not trigger global handler)
  const handleClick = (e) => {
    e.stopPropagation();
    setIsRotating(!isRotating);
  };

  return (
    <>
      <mesh
        ref={meshRef}
        position={[position[0], position[1], position[2]]}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        {materials.map((material, idx) => (
          <primitive key={idx} object={material} attach={`material-${idx}`} />
        ))}
      </mesh>
      
      {error && (
        <Html position={[position[0], position[1] + 1.5, position[2]]}>
          <div style={{ color: 'red', backgroundColor: 'white', padding: '5px' }}>
            {error}
          </div>
        </Html>
      )}
    </>
  );
};

export default ShapeWithImage;