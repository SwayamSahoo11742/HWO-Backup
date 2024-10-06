import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Cone } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const HWOLOS = ({ v1, v2, params }) => {
  console.log(v1)
  const h = v1.distanceTo(v2);

  const HFOV = Math.atan(params.sensorSize/(2*params.focalLength * 1000))
  const radius = h*Math.tan(HFOV)
  
  // Create geometry and material
  const geometry = new THREE.ConeGeometry(radius, h);
  geometry.translate(0, h * 0.5, 0); // base to 0
  geometry.rotateX(Math.PI * 0.5); // align along Z-axis

  const material = new THREE.MeshBasicMaterial({ color: 'orange', opacity:0.5, transparent:true}); // choose a color
  const meshRef = React.useRef();

  // Set position and orientation
  React.useEffect(() => {
    meshRef.current.position.copy(v1);
    meshRef.current.lookAt(v2);
  }, [v1, v2]);

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};



