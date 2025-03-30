import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import AIChrisTexture from '../assets/AIChris.png';

const ShapeWithImage = (props) => {
  const meshRef = useRef();
  const [isRotating, setIsRotating] = useState(true);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  // Create materials array
  const [materials, setMaterials] = useState([
    new THREE.MeshStandardMaterial({ color: 'red' }),         // right
    new THREE.MeshStandardMaterial({ color: 'green' }),       // left
    new THREE.MeshStandardMaterial({ color: 'blue' }),        // top
    new THREE.MeshStandardMaterial({ color: 'yellow' }),      // bottom
    new THREE.MeshStandardMaterial({ color: 'white' }),       // front - placeholder until texture loaded
    new THREE.MeshStandardMaterial({ color: 'magenta' })      // back
  ]);
  
  // Load texture properly with error handling
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    
    textureLoader.load(
      AIChrisTexture,
      (loadedTexture) => {
        // On successful load
        loadedTexture.flipY = false; // Try this if texture appears upside down
        
        // All sides of the cube have the image
        setMaterials(prevMaterials => {
            return prevMaterials.map(() => new THREE.MeshStandardMaterial({
                map: loadedTexture,
                side: THREE.FrontSide
            }));
        })
        
        // Update just the front face material (index 4)
        // setMaterials(prevMaterials => {
        //   return prevMaterials.map() = new THREE.MeshStandardMaterial({ 
        //     map: loadedTexture,
        //     side: THREE.FrontSide 
        //   });
        //   return newMaterials;
        // });
        
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
  }, []);
  
  // Animation loop (equivalent to requestAnimationFrame)
  useFrame(() => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  // Handle click to toggle rotation
  const handleClick = (e) => {
    e.stopPropagation();
    setIsRotating(!isRotating);
  };

  // Use provided position or default position
  const position = props.position || [0, 0, 0];

  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        {materials.map((material, index) => (
          <primitive key={index} object={material} attach={`material-${index}`} />
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