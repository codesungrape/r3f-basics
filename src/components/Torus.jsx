import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


export default function Torus({ position, args, color}) {

    const ref = useRef()

    useFrame((state, delta) => {
        ref.current.rotation.y += delta;
        ref.current.rotation.x -= delta;
        ref.current.rotation.z += delta;
        ref.current.position.z = Math.sin(state.clock.elapsedTime) * 1;
    })
    return (
        <mesh ref={ref} position={position} /**  Controls the sphere's position in 3D space (like placing furniture in a room*/>
            <torusGeometry args={args} /** determines the shape and size of the object */ />
            <meshStandardMaterial 
                color={color} 
                roughness={0.5} 
                metalness={0.5}
            /> 
        </mesh>

    )
}