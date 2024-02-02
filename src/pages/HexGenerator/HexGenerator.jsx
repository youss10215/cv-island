import React from "react";
import * as summerJSON from "../../conf/islands/summer.json";

const getCellClass = (hex) => {
  if (hex > 8) {
    return "brown";
  }

  if (hex > 7) {
    return "green";
  }

  if (hex > 5) {
    // hexadecimal color sand
    return "#f4a460";
  }

  if (hex > 3) {
    return "yellow";
  }

  return "blue";
};

const HexGrid = () => {
  const grid = Object.values(summerJSON).map((row) => {
    return Object.values(row).map((cell, j) => {
      return (
        <div key={j} className="row">
          {Object.values(cell).map((hex, k) => {
            return (
              <div
                className="cell"
                style={{ background: getCellClass(hex) }}
                key={`${j}-${k}`}
              >
                {hex}
              </div>
            );
          })}
        </div>
      );
    });
  });
  return grid;
};

const HexGenerator = () => (
  <div className="container">
    <div className="grid">
      <HexGrid />
    </div>
  </div>
);

export default HexGenerator;
