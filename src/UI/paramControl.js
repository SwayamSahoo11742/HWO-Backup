import React, { useState } from 'react';
import { AnalysisGeneration } from '../utils/utils';
export const ParamControl = ({setParams, params, coords, orbitRadius, setAnalysis}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: Number(value), // Convert input value to number
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., log params or send to an API
    console.log(params);
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block">
          Focal Length: &nbsp;
          <input
            type="number"
            step={0.01}
            min={0.0}
            name="focalLength"
            value={params.focalLength}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>
      </div>
      <div>
        <label className="block">
          Sensor Size: &nbsp;&nbsp;&nbsp;
          <input
          step={0.01}
            type="number"
            name="sensorSize"
            min={0}
            value={params.sensorSize}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>
      </div>
      <div>
        <label className="block">
          Aperture: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
          step={0.01}
            type="number"
            name="aperture"
            min={0}
            value={params.aperture}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>
      </div>
      <div>
        <label className="block">
          Pitch: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="number"
            name="pitch"
            value={params.pitch}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>
      </div>
      <div>
        <label className="block">
          Yaw: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="number"
            name="yaw"
            value={params.yaw}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>
      </div>
      <div>
        <label className="block">
          Roll: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="number"
            name="roll"
            value={params.roll}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-4" onClick={() => setAnalysis(AnalysisGeneration(coords, orbitRadius, params))}>Update Stats</button>
    </form>
  );
};
