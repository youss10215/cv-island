import * as summerJSON from "../../conf/islands/summer.json";

const getCellColor = (height) => {
  if (height > 8) {
    return "#6F3620";
  }

  if (height > 7) {
    return "#92D3A0";
  }

  if (height > 5) {
    return "#D6E4D9";
  }

  if (height > 3) {
    return "#CABBA1";
  }

  if (height > 2) {
    return "#E8E7E6";
  }

  return "cyan";
};

const getCellPosition = (position) => {
  const positionX = position.x / 1.5 + 12;
  const positionY = position.y / 1.5;

  return {
    transform: `translate(${positionX * 35}px, ${positionY * 35}px)`,
  };
};

const HexGrid = () => {
  const grid = Object.values(summerJSON).map((row) => {
    return Object.values(row).map((cell, j) => {
      return Object.values(cell).map(({ height, position }, k) => {
        return (
          <div
            className="cell"
            style={{
              background: getCellColor(height),
              ...getCellPosition(position),
            }}
            key={`${j}-${k}`}
          >
            {height.toFixed(2)}
          </div>
        );
      });
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
