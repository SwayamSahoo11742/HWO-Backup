import * as THREE from 'three';


// The updateLabel function

export const updateLabel = (model, textDiv, sceneDiv, camera, textPosition) => {
  console.log(textDiv)
    if (model) {
      textPosition.setFromMatrixPosition(model.matrixWorld);
      textPosition.project(camera);
  
      const halfWidth = sceneDiv.clientWidth / 2;
      const halfHeight = sceneDiv.clientHeight / 2;
      textPosition.x = (textPosition.x * halfWidth) + halfWidth;
      textPosition.y = -(textPosition.y * halfHeight) + halfHeight;
  
      const labelWidth = textDiv.offsetWidth;
      const labelHeight = textDiv.offsetHeight;
  
      // Check if the label is within the viewport
      const isInViewport = (
        textPosition.x >= -labelWidth &&
        textPosition.x <= sceneDiv.clientWidth &&
        textPosition.y >= -labelHeight &&
        textPosition.y <= sceneDiv.clientHeight
      );
  
      if (isInViewport) {
        textDiv.style.display = 'block';
        textDiv.style.top = `${Math.max(0, Math.min(textPosition.y, sceneDiv.clientHeight - labelHeight))}px`;
        textDiv.style.left = `${Math.max(0, Math.min(textPosition.x, sceneDiv.clientWidth - labelWidth))}px`;
      } else {
        textDiv.style.display = 'none';
      }
    }
  };

    // Create points for the orbit circle
export const createOrbitPoints = (radius, params, segments = 360) => {
        const points = [];
        const tiltAngle = THREE.MathUtils.degToRad(0);

        // Create an Euler object for the given pitch, yaw, and roll
        const euler = new THREE.Euler(
          THREE.MathUtils.degToRad(params.pitch),
          THREE.MathUtils.degToRad(params.yaw),
          THREE.MathUtils.degToRad(params.roll),
          'XYZ'
        );
      
        // Create a quaternion from the Euler angles
        const quaternion = new THREE.Quaternion().setFromEuler(euler);
      
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const x = radius * Math.cos(theta);
          const y = 0; 
          const z = radius * Math.sin(theta);
          
          const point = new THREE.Vector3(x, y, z).applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltAngle);
      
          // Apply pitch, yaw, and roll
          point.applyQuaternion(quaternion);
      
          points.push(point);
        }
      
        return points;
      };
      