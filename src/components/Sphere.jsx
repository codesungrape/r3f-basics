export const Sphere = ({ position, side, color}) => {
    return (
        <mesh position={position} /**  Controls the sphere's position in 3D space (like placing furniture in a room*/>
            <sphereGeometry args={side} /** determines the shape and size of the object */ />
            <meshStandardMaterial 
                color={color} 
                roughness={0.5} 
                metalness={0.5}
            /> 
        </mesh>

    )
}

export default Sphere;