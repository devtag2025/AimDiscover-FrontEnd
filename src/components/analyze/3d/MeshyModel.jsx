"use client"
import {useRef} from "react"
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function MeshyModel({ refineTaskId }) {
  const groupRef = useRef();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const proxyUrl = `${API}/analysis/3d-model/${refineTaskId}`;

  const { scene } = useGLTF(proxyUrl, true, undefined, (loader) => {
    loader.setCrossOrigin("anonymous");
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  if (scene) {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 1.5;
          child.material.metalness = 0.2;
          child.material.roughness = 0.5;
        }
      }
    });
  }

  return (
    <group ref={groupRef} scale={2} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default MeshyModel;