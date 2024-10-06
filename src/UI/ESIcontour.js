import React, { memo } from 'react';
import Plot from 'react-plotly.js';

const ESIPlot = memo(({ points }) => {
  // Constants
  const F_earth = 1.0;
  const R_earth = 1.0;

  // Generate logarithmic ranges for r and f from 10^-3 to 10^3
  const r = Array.from({ length: 1500 }, (_, i) => Math.pow(10, (i / 1500) * 6 - 3));
  const f = Array.from({ length: 1500 }, (_, i) => Math.pow(10, (i / 1500) * 6 - 3));

  // Create meshgrid for ESI
  const ESI = [];
  for (let i = 0; i < r.length; i++) {
    const row = [];
    for (let j = 0; j < f.length; j++) {
      const R_val = r[i];
      const F_val = f[j];
      const esi_val = 1 - Math.sqrt(0.5 * (
        Math.pow((F_val - F_earth) / (F_val + F_earth), 2) +
        Math.pow((R_val - R_earth) / (R_val + R_earth), 2)
      ));
      row.push(esi_val);
    }
    ESI.push(row);
  }

  let pointX = [];
  let pointY = [];
  if (points) {
    pointX = points.characterizable.map(point => point.pl_rade);
    pointY = points.characterizable.map(point => point.pl_insol);
  }

  return (
    <div style={{ height: '30vh' }}>
      <Plot
        data={[
          {
            z: ESI,
            x: r,
            y: f,
            type: 'contour',
            colorscale: 'RdBu',
            colorbar: {
              title: {
                text: 'ESI',
                font: { color: 'white' },
              },
              tickfont: { color: 'white' },
            },
          },
          {
            x: pointX,
            y: pointY,
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'white', size: 5 },
          },
        ]}
        layout={{
          title: {
            text: 'Earth Similarity Index (ESI)',
            font: { color: 'white' },
          },
          xaxis: {
            title: {
              text: 'Stellar Flux',
              font: { color: 'white' },
            },
            type: 'log',
            range: [-3, 3],
            tickfont: { color: 'white' },
          },
          yaxis: {
            title: {
              text: 'Planet Radius',
              font: { color: 'white' },
            },
            type: 'log',
            range: [-3, 3],
            tickfont: { color: 'white' },
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          autosize: true, // Ensures it adapts to container size
        }}
        style={{ width: '100%', height: '100%' }} // Ensures full width and height of the parent
      />
    </div>
  );
});

export default ESIPlot;
