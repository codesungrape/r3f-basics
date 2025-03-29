export const Cube = ({ position, side, color }) => {
    return (
        // position: [x, y, z] - Controls the sphere's position in 3D space
      <mesh position={position}> 
          <boxGeometry args={side} />
          <meshStandardMaterial color={color}/> 
      </mesh>
    )
}

export default Cube;

