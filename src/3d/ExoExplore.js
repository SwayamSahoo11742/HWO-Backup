import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Line, OrbitControls, useAspect } from '@react-three/drei';
import * as THREE from 'three';
import data from './exo.json';
import { ExoplanetPoints } from './components/planets';
import { HWOLOS } from './components/HWO';
import { Galaxy } from './components/galaxy';
import { coords } from './components/planets';
import { pointInCone } from '../utils/utils';
import { createOrbitPoints, updateLabel } from './components/utils';
import { AnalysisGeneration } from '../utils/utils';

const scale = 1e+16;
export const ExoExplore = ({params, coords, setCoords, setCoordsExtremes, coordsExtremes, LOS,setLOS, property, setAnalysis, tar}) => {
  const orbitRadius = 2542864.0; 

  const [d, setD] = useState(6);
  const [coneProp, setConeProp] = useState({v1: LOS, v2: new THREE.Vector3(0,0,0)})
  const [angle, setAngle] = useState(0);
  const tiltAngle = THREE.MathUtils.degToRad(60);
  
  const planetRef = useRef();
  const labelRef = useRef();
  const textPosition = new THREE.Vector3(); 

  // Animated target moving along the orbit
// Animated target moving along the orbit, rotating only once upon startup

const Animation = () => {
  const { camera, scene } = useThree(); // Get camera and scene from useThree
  useFrame(() => {
      if (planetRef.current && labelRef.current) {
        updateLabel(planetRef.current, labelRef.current, document.getElementById('canvas'), camera, textPosition);
      }
    });
}


const AnimatedTarget = ({ radius }) => {
  const [hasRotated, setHasRotated] = useState(false);
   
  useFrame((state, delta) => {

    const newAngle = angle + delta*200;

    if (newAngle >= Math.PI * 2) {
      setAngle(Math.PI * 2); // Ensure it stops at exactly one full rotation
      setHasRotated(true);    // Mark as completed
      return;
    }

    setAngle(newAngle);
    
    const x = radius * Math.cos(newAngle);
    const y = 0;
    const z = radius * Math.sin(newAngle);
  
    // Create the LOS vector
    let losVector = new THREE.Vector3(x, y, z);
  
    // Apply tilt
    // losVector.applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltAngle); // Tilt the same way as the orbit
  
    const euler = new THREE.Euler(
      THREE.MathUtils.degToRad(params.pitch), 
      THREE.MathUtils.degToRad(params.yaw),
      THREE.MathUtils.degToRad(params.roll), 
      'YXZ'
    );
  
    // Apply rotation to the LOS vector
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    losVector.applyQuaternion(quaternion);
    
    const HFOV = Math.atan(params.sensorSize/(2*params.focalLength * 1000))
    const r = losVector.distanceTo(coneProp.v2) *Math.tan(HFOV)
    setLOS(losVector);
    setConeProp({ v1: losVector, v2: new THREE.Vector3(0, 0, 0), r:r});
  });
};

useEffect(() => {
  const pts = createOrbitPoints(orbitRadius, params);
  const HFOV = Math.atan(params.sensorSize/(2*params.focalLength * 1000))
  const r = pts[0].distanceTo(coneProp.v2) *Math.tan(HFOV)
  console.log(pts[0])
  setLOS(pts[0])

}, [params]);


  return (
    <>
    <Canvas
      id='canvas'
      gl={{ alpha: false, antialias: true }}
      style={{ background: 'black', width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 4000000], far: 100000000, near: 0.0001 }}
    >
      {/* <Galaxy imageUrl={"./galaxy.png"} /> */}

      {/* Draw orbit curve */}
      <Line
        points={createOrbitPoints(orbitRadius, params)} // Points to create the orbit path
        color="blue" // Color of the orbit line
        lineWidth={1} // Thickness of the line
      />
      {tar?       
      <mesh position={[tar.x, tar.y, tar.z]} ref={planetRef}>
        <sphereGeometry args={[10000, 32, 32]}/> {/* Sphere with radius 1 */}
        <meshBasicMaterial color="royalblue" />
      </mesh>:null}
      <AnimatedTarget radius={orbitRadius} />
      <ExoplanetPoints data={data} params={params} coords={coords} setCoords={setCoords} setCoordsExtremes={setCoordsExtremes} coordsExtremes={coordsExtremes} property={property}/>
      <HWOLOS v1={LOS} v2={new THREE.Vector3(0, 0, 0)} params={params} />
      <OrbitControls />
      <Animation />
    </Canvas>
    {tar?       
    <div ref={labelRef} id={tar.pl_name} className="absolute z-50 text-white">
        {tar.pl_name}
      </div>: null}
    </>
  );
};
