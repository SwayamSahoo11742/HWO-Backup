// Utility functions go here
import * as THREE from 'three';
import { createOrbitPoints } from '../3d/components/utils';

export function habitZoneRadii(bolMagSun=4.72,apparentMag,d,specType){
    var absMag = apparentMag-(5*Math.log10(d/10));
    var bolMagStar = absMag+specType;
    var absLum = Math.pow(10,(bolMagStar-bolMagSun)/-2.5);
    var radInner = Math.sqrt(absLum/1.1);
    var radOutter = Math.sqrt(absLum/0.54);
    return [radInner,radOutter];
}

export function scaledVector(point,orbitRad){
    // scale point
    var a = orbitRad / Math.sqrt(Math.pow(point.x,2)+Math.pow(point.y,2)+Math.pow(point.z,2));
    point.multiplyScalar(a);
    return point;
}
export function calculatePitchYawRoll(v1, v2) {
    // Ensure both vectors are unit vectors
    const unitV1 = v1.clone().normalize();
    const unitV2 = v2.clone().normalize();

    // Calculate the direction vector from v1 to v2
    const direction = unitV2.clone().sub(unitV1).normalize();

    // Calculate the quaternion representing the rotation
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(unitV1, unitV2);

    // Convert quaternion to Euler angles (pitch, yaw, roll)
    const euler = new THREE.Euler().setFromQuaternion(quaternion, 'XYZ');

    // Convert radians to degrees for easier understanding (if needed)
    const pitch = THREE.MathUtils.radToDeg(euler.x); // Rotation around the X-axis
    const yaw = THREE.MathUtils.radToDeg(euler.y);   // Rotation around the Y-axis
    const roll = THREE.MathUtils.radToDeg(euler.z);  // Rotation around the Z-axis

    return { pitch, yaw, roll };
}

export const pointTo = (data, orbitRad, LOS, setParams, setLOS, setTar) => {
    const scaledVec = scaledVector(new THREE.Vector3(data.x, data.y, data.z), orbitRad);
 
    const { pitch, yaw, roll } = calculatePitchYawRoll(LOS, scaledVec);
    setLOS(scaledVec)
    setTar(data)
    setParams(prevParams => {
        return {
            ...prevParams,
            pitch: pitch,
            yaw: yaw,
            roll: roll
        };
    });
}


export const AnalysisGeneration = (points, orbitRadius, params) => {

    let y = [];
    let n = [];
    let u = [];
    const explored = new Set();

    const conePoints = createOrbitPoints(orbitRadius, params);
    conePoints.forEach(conePoint => {
        points.forEach(data => {
            const point = new THREE.Vector3(data.x, data.y, data.z);
            const apex = new THREE.Vector3(0, 0, 0);
            const direction = new THREE.Vector3().subVectors(conePoint, apex).normalize();
            const h = apex.distanceTo(conePoint); // Height of the cone
            const HFOV = Math.atan(params.sensorSize/(2*params.focalLength * 1000))
            const r = h *Math.tan(HFOV)
    
            // Calculate the vector from the apex to the point
            const toPoint = new THREE.Vector3().subVectors(point, apex);
    
            // Project the point onto the direction vector to find the distance along the axis
            const coneDist = toPoint.dot(direction);
    
            // Calculate the radius at that point along the axis
            const coneRadius = (coneDist / h) * r;
    
            // Calculate the orthogonal distance from the point to the axis
            const orthDistance = toPoint.length() - coneDist; // Length of toPoint minus the projection length

            // Check if the point is valid and hasn't been counted yet and in the cone
            if (!explored.has(data.pl_name)  && orthDistance < coneRadius) {
                if(data.SNR === Infinity || isNaN(data.SNR) || data.ESmax === Infinity || isNaN(data.ESmax)){
                    u.push(data);
                }
                else {
                    if (data.SNR > 5 && data.sy_dist < data.ESmax) {
                        y.push(data);
                    } else {
                        n.push(data);
                    }
                }
                explored.add(data.pl_name)
            }
        });
    });

    return {characterizable: y, nonCharacterizable: n, unknown: u}; 
};


