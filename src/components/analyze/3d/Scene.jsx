import { PerspectiveCamera } from "@react-three/drei";
import { CanvasLoader } from "../CanvasLoader";
import { ModelErrorBoundary } from "../ModalErrorBoundary";
import MeshyModel from "./MeshyModel";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
function Scene({ refineTaskId }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />
      <ModelErrorBoundary fallback={<CanvasLoader />}>
        <MeshyModel refineTaskId={refineTaskId} />
      </ModelErrorBoundary>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={3}
        maxDistance={20}
      />
      <Environment preset="city" />
    </>
  );
}

export default Scene;