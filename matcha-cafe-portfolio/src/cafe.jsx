import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Basic Café Counter Component
function CafeCounter() {
  return (
    <group position={[0, 0, -3]}>
      {/* Main Counter */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[6, 1, 1.5]} />
        <meshStandardMaterial color="#d4a574" /> {/* Birch/oak wood color */}
      </mesh>
      
      {/* Counter Top */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[6.2, 0.1, 1.6]} />
        <meshStandardMaterial color="#c89968" />
      </mesh>
      
      {/* Bakery Display Case (Left) */}
      <mesh position={[-2, 0.3, 0]}>
        <boxGeometry args={[1.5, 0.8, 1]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      
      {/* Matcha Station (Right) */}
      <mesh position={[2, 0.3, 0]}>
        <boxGeometry args={[1.5, 0.2, 1]} />
        <meshStandardMaterial color="#7cb342" />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 1.5, -1]}>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#e8d5c4" />
      </mesh>
      
      {/* Menu Poster 1 */}
      <mesh position={[-2, 2.5, -0.9]}>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial color="#a5d6a7" />
      </mesh>
      
      {/* Menu Poster 2 */}
      <mesh position={[0, 2.5, -0.9]}>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial color="#ffb3ba" /> {/* Light pink */}
      </mesh>
      
      {/* Menu Poster 3 */}
      <mesh position={[2, 2.5, -0.9]}>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial color="#81c784" />
      </mesh>
    </group>
  );
}

// Placeholder for character (simple for now)
function SimpleCharacter({ position, color }) {
  const characterRef = useRef();
  
  useFrame((state) => {
    // Gentle bobbing animation
    characterRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
  });
  
  return (
    <group ref={characterRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.25, 0.8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// 3D Scene Component
export default function CafeScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 3, 2]} intensity={0.4} color="#ffb3ba" />
      
      <CafeCounter />
      
      {/* You at matcha station */}
      <SimpleCharacter position={[2, 0.5, -2]} color="#ffc0cb" />
      
      {/* Otter 1 at bakery */}
      <SimpleCharacter position={[-2, 0.5, -2]} color="#8b7355" />
      
      {/* Otter 2 with box */}
      <SimpleCharacter position={[-1, 0.5, 0]} color="#8b7355" />
      
      <OrbitControls 
        enableZoom={true} 
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}