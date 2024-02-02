import * as summerJSON from "../../conf/islands/summer.json";

const getCellClass = (hex) => {
  if (hex > 8) {
    return "#6F3620";
  }

  if (hex > 7) {
    return "#92D3A0";
  }

  if (hex > 5) {
    return "#D6E4D9";
  }

  if (hex > 3) {
    return "#CABBA1";
  }

  if (hex > 1.6) {
    return "#E8E7E6";
  }

  return "cyan";
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
