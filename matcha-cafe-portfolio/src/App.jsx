import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function RotatingCube() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.7;
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#7cb342" />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingCube />
        <OrbitControls enableZoom={true} />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Three.js Test ✓</h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
          Drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  );
}