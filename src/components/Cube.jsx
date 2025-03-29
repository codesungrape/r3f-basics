import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Cube = ({ position, args, color }) => {

    const ref = useRef();

    useFrame((state, delta) => {
        ref.current.rotation.y -= delta;
        ref.current.rotation.x -= delta;
        ref.current.rotation.z -= delta;
        // ref.current.position.z += delta; brings it forward 
        ref.current.position.z = Math.sin(state.clock.elapsedTime) * 0.5;
    })


    return (
        // Fundamental building block for rendering any building bocks. A mesh needs a germetry shape and everything within the mesh are its properties- like a container
      <mesh ref={ref} position={position}> 
          <boxGeometry args={args} />
          <meshStandardMaterial color={color}/> 
      </mesh>
    )
}

export default Cube;

