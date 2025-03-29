# 3js Learning Materials

## 3js File Structure Recommendation

![Screenshot](./src/assets/3js-file-structure.png)

### Canvas

- The canvas is the area where the 3D object is rendered.
- The canvas is created using the <canvas> tag.

### Scene

- The scene is the container for all the 3D objects.
- The scene is created using the <scene> tag.

### Camera

- The camera is the point of view from which the 3D object is viewed.
- The camera is created using the <perspectiveCamera> tag.

### Renderer

- The renderer is the object that renders the 3D object on the canvas.
- The renderer is created using the <renderer> tag.

### Position and Args

- The Args property sets the shape and the size of the object within the <mesh> tag.
  ![Screenshot](./src/assets/pos-vs-args.png)
  ![Screenshot](./src/assets/args.png)

### Rotation

- The rotation property sets the rotation of the object within the <mesh> tag.

### Light

- The light property sets the light source for the 3D object.
- The light property is created using the <ambientLight> tag.

### Directional Light

- The directional light property sets the direction of the light source for the 3D object.
- The directional light property is created using the <directionalLight> tag.

### Point Light

- The point light property sets the point of the light source for the 3D object.
- The point light property is created using the <pointLight> tag.

### Spot Light

- The spot light property sets the spot of the light source for the 3D object.
- The spot light property is created using the <spotLight> tag.

### Hemisphere Light

- The hemisphere light property sets the hemisphere of the light source for the 3D object.
- The hemisphere light property is created using the <hemisphereLight> tag.

### Ambient Light

- The ambient light property sets the ambient light source for the 3D object. Illuminates all objects in the scene equally.
- This light cannot be used to cast shadows as it does not have a direction.
- The ambient light property is created using the <ambientLight> tag.

## Animation

- The animation property sets the animation for the 3D object.
- The animation property is created using the <animation> tag.

### useFrame()

- The useFrame() hook is a special feature specific to react-three-fiber., not a general React hook or part of Three.js itself.
- The useFrame() function is used to create an animation loop for the 3D object. It allows you to execute code on every frame of the animation, which runs at 60 frames per second.
- It is similar to the requestAnimationFrame() function in JavaScript.
- It is used to update the position, rotation, and scale of the 3D object.
- The useFrame() function takes a callback function as an argument, which is called on every frame of the animation loop.

```javascript
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function RotatingSphere() {
  // Create a reference to our mesh
  const meshRef = useRef();

  // This function runs on every frame
  useFrame((state, delta) => {
    // Rotate the mesh a little bit each frame
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      {/* args={[radius, widthSegments, heightSegments]} */}
      <meshStandardMaterial color="#3a86ff" />
    </mesh>
  );
}
```

![Screenshot](./src/assets/useFrame-parameters.png)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
