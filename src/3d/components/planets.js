import React, { useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import data from "../exo.json";

const P2M = 308.6;
function interpolateColor(min, max, num, color1, color2) {
  // Normalize the number to a 0-1 scale
  let normalized = (num - min) / (max - min);
  normalized = Math.max(0, Math.min(1, normalized)); // Clamp between 0 and 1

  // Extract the RGB components of both colors
  let r1 = parseInt(color1.substring(1, 3), 16);
  let g1 = parseInt(color1.substring(3, 5), 16);
  let b1 = parseInt(color1.substring(5, 7), 16);

  let r2 = parseInt(color2.substring(1, 3), 16);
  let g2 = parseInt(color2.substring(3, 5), 16);
  let b2 = parseInt(color2.substring(5, 7), 16);

  // Interpolate the RGB values
  let r = r1 + (r2 - r1) * normalized;
  let g = g1 + (g2 - g1) * normalized;
  let b = b1 + (b2 - b1) * normalized;

  // Return normalized RGB values (0 to 1 range)
  return [r / 255, g / 255, b / 255];
}

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const convertToCartesian = (glon, glat, radius = 1) => {
  const lonRad = degreesToRadians(glon);
  const latRad = degreesToRadians(glat);

  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.cos(latRad) * Math.sin(lonRad);
  const z = radius * Math.sin(latRad);

  return new THREE.Vector3(x, y, z);
};

export const ExoplanetPoints = ({ params, coords, setCoords, setCoordsExtremes, coordsExtremes, property}) => {

  useEffect(() => {
    const D = params.aperture;
    const SNR0 = 100;
  
    let newMinMax = {
      st_rad: { min: Infinity, max: -Infinity },
      pl_rade: { min: Infinity, max: -Infinity },
      pl_orbsmax: { min: Infinity, max: -Infinity },
      sy_dist: { min: Infinity, max: -Infinity },
      SNR: { min: Infinity, max: -Infinity },
      ESmax: { min: Infinity, max: -Infinity },
      ESI: {min : Infinity, max: -Infinity},
      sy_vmag : {min : Infinity, max: -Infinity},
      pl_insol : {min: Infinity, max: -Infinity}
    };
  
    const isValid = (value) => !isNaN(value) && isFinite(value);
  
    // Calculate global min/max
    const newCoords = data.map(({ glon, glat, st_rad, pl_rade, pl_orbsmax, sy_dist, pl_orbeccen, sy_vmag,pl_bmasse,disc_year,hostname, st_spectype,discoverymethod, pl_name, pl_insol,pl_eqt, disc_facility}) => {
      
      const sy_dist_m = sy_dist * P2M;
      const Rstar = st_rad;
      const RP = pl_rade;
      const PS = pl_orbsmax;
      const cartesian = convertToCartesian(glon, glat, sy_dist_m);
      let SNR = SNR0 * ((Rstar * RP * (D / 6)) / ((sy_dist / 10) * PS)) * 2;
      const F_val = pl_insol;
      const R_val = pl_rade;
      const ESI = 1 - Math.sqrt(0.5 * (
        Math.pow((F_val - 1) / (F_val + 1), 2) +
        Math.pow((R_val - 1) / (R_val + 1), 2)
      )); 
      if (isNaN(SNR)) SNR = 0;
  
      const ESmax = 15 * (D / 6) / PS;
  
      // Update the global min/max
      if (isValid(st_rad)) {
        newMinMax.st_rad.min = Math.min(newMinMax.st_rad.min, st_rad);
        newMinMax.st_rad.max = Math.max(newMinMax.st_rad.max, st_rad);
      }
      if (isValid(ESI) && ESI >= 0 && ESI <= 1) {
        newMinMax.ESI.min = Math.min(newMinMax.ESI.min, ESI);
        newMinMax.ESI.max = Math.max(newMinMax.ESI.max, ESI);
      }
      if (isValid(pl_rade)) {
        newMinMax.pl_rade.min = Math.min(newMinMax.pl_rade.min, pl_rade);
        newMinMax.pl_rade.max = Math.max(newMinMax.pl_rade.max, pl_rade);
      }
      if (isValid(pl_orbsmax)) {
        newMinMax.pl_orbsmax.min = Math.min(newMinMax.pl_orbsmax.min, pl_orbsmax);
        newMinMax.pl_orbsmax.max = Math.max(newMinMax.pl_orbsmax.max, pl_orbsmax);
      }
      if (isValid(sy_dist)) {
        newMinMax.sy_dist.min = Math.min(newMinMax.sy_dist.min, sy_dist);
        newMinMax.sy_dist.max = Math.max(newMinMax.sy_dist.max, sy_dist);
      }
      if (isValid(pl_insol)) {
        newMinMax.pl_insol.min = Math.min(newMinMax.pl_insol.min, pl_insol);
        newMinMax.pl_insol.max = Math.max(newMinMax.pl_insol.max, pl_insol);
      }
      if (isValid(sy_vmag)) {
        newMinMax.sy_vmag.min = Math.min(newMinMax.sy_vmag.min, sy_vmag);
        newMinMax.sy_vmag.max = Math.max(newMinMax.sy_vmag.max, sy_vmag);
      }
      if (isValid(SNR)) {
        newMinMax.SNR.min = Math.min(newMinMax.SNR.min, SNR);
        newMinMax.SNR.max = Math.max(newMinMax.SNR.max, SNR);
      }
      if (isValid(ESmax)) {
        newMinMax.ESmax.min = Math.min(newMinMax.ESmax.min, ESmax);
        newMinMax.ESmax.max = Math.max(newMinMax.ESmax.max, ESmax);
      }

      const characterizable = ((SNR > 5 && sy_dist < ESmax) ? 1: 0);
      return {x:cartesian.x,y:cartesian.y,z:cartesian.z, glon, glat, st_rad, pl_rade, pl_orbsmax, sy_dist,pl_eqt,pl_bmasse,disc_year,hostname, discoverymethod,sy_dist_m, SNR, ESmax, characterizable, pl_orbeccen, sy_vmag,st_spectype, pl_name,disc_facility, pl_insol, ESI};
    });
  
    // Adjust min/max to 5th and 95th percentiles
    const calculatePercentileRange = (key) => {
      const values = newCoords.map(item => item[key]).filter(isValid);
      values.sort((a, b) => a - b);
      const lowIndex = Math.floor(values.length * 0.05);
      const highIndex = Math.ceil(values.length * 0.95);
      return { min: values[lowIndex], max: values[highIndex] };
    };
  
    // Replace actual extremes with adjusted ranges
    newMinMax.pl_rade = calculatePercentileRange("pl_rade");
    newMinMax.st_rad = calculatePercentileRange("st_rad");
    newMinMax.pl_orbsmax = calculatePercentileRange("pl_orbsmax");
    newMinMax.sy_dist = calculatePercentileRange("sy_dist");
  
    // Store adjusted ranges
    setCoords(newCoords);
    setCoordsExtremes(newMinMax);
  
  }, [params.aperture]);
  

  const key = property;
  const positions = useMemo(() => {
    return coords.map(({ x, y, z }) => new THREE.Vector3(x, y, z));
  }, [coords]);

  // Create a buffer geometry to hold the points
  const pointGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(positions.length * 3);
    const colors = new Float32Array(positions.length * 3); // To hold color data

    coords.forEach((pos, idx) => {
      vertices[idx * 3] = pos.x;
      vertices[idx * 3 + 1] = pos.y;
      vertices[idx * 3 + 2] = pos.z;


      let r,g,b;
      if(property === "characterizable"){
        [r,g,b] = interpolateColor(1 ,0, pos[property], "#00FF00", "#FF0000")
      }else{
        const maxVal = coordsExtremes[property].max;
        const minVal = coordsExtremes[property].min;
        [r,g,b] = interpolateColor(minVal ,maxVal, pos[property], "#FF0000", "#00FF00")
      }
      colors[idx * 3] = r; // Red
      colors[idx * 3 + 1] = g; // Green
      colors[idx * 3 + 2] = b; // Blue
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3)); // Set color attribute
    return geometry;
  }, [positions, coords, property]);

  const pointMaterial = useMemo(() => 
    new THREE.PointsMaterial({ size: 50, vertexColors: true }), []); // Enable vertex colors

  return <points args={[pointGeometry, pointMaterial]} />;
};
