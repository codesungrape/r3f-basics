import { useFrame} from "@react-three/fiber"
import { useRef, useState } from "react"

export const Sphere = ({ position, args, color }) => {

    const [isHovered, setIsHovered] = useState(false)

    const ref = useRef()
    useFrame(( state, delta) => {
        ref.current.rotation.y += delta * 0.2;
        ref.current.position.z = Math.sin(state.clock.elapsedTime) * 0.2;
    })
    return (
        <mesh 
            ref={ref} 
            position={position} /**  Controls the sphere's position in 3D space (like placing furniture in a room*/
            onPointerEnter={(event) => {event.stopPropagation();
            setIsHovered(true)}}
            onPointerLeave= {(event) =>{event.stopPropagation();
            setIsHovered(false)

        }}
            
        >
            <sphereGeometry args={args} /** determines the shape and size of the object */ />
            <meshStandardMaterial 
                color={isHovered ? "lightgreen" : "hotpink"} 
                roughness={0.5} 
                metalness={0.5}
                wireframe
            /> 
        </mesh>

    )
}

export default Sphere;