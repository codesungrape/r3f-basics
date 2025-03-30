import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
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
 * 
 * Usage:
 * <ShapeWithImage imageTexture={importedImage} position={[1, 2, 3]} />
 */

const ShapeWithImage = (props) => {
    const imageTexture = props.imageTexture
    const position = props.position || [0, 0, 0]
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
    if (!imageTexture) {
        setError('No image texture provided');
        return;
    }

    const textureLoader = new THREE.TextureLoader();

    
    textureLoader.load(
      imageTexture,
      (loadedTexture) => {
        console.log("loadedTexture: ",loadedTexture)
        // On successful load
        loadedTexture.flipY = false; // Try this if texture appears upside down
        
        // All sides of the cube have the image
        setMaterials(prevMaterials => {
            return prevMaterials.map(() => new THREE.MeshStandardMaterial({
                map: loadedTexture,
                side: THREE.FrontSide
            }));
        })
        
        
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