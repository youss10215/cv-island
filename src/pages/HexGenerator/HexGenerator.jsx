import { useState } from "react";
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

const replaceElements = (obj, arr) => {
  arr.forEach((item) => {
    if (obj.hasOwnProperty(item.id)) {
      obj[item.id] = item;
    }
  });
};

const HexGrid = () => {
  const [items, setItems] = useState({ ...summerJSON }.default);
  const [selectedItems, setSelectedItems] = useState([]);
  const [value, setValue] = useState(0);

  const onChange = (e) => {
    e.currentTarget && setValue(e.currentTarget.value);
  };

  const onSubmit = () => {
    const newItems = selectedItems.map((item) => {
      return { ...item, height: Number.parseFloat(value) };
    });

    const updatedItems = { ...items };
    replaceElements(updatedItems, newItems);
    setItems(updatedItems);
    setSelectedItems([]);
  };

  const isSelectedCell = (cellId) => {
    return !!selectedItems.find((e) => e.id === cellId);
  };

  const onClick = (cell) => {
    if (!isSelectedCell(cell.id)) {
      setSelectedItems([...selectedItems, cell]);
      return;
    }

    const newSelectedItems = selectedItems.filter((e) => e.id !== cell.id);
    setSelectedItems(newSelectedItems);
  };

  const grid = Object.values(items).map((cell) => {
    const { id, height, position } = cell;
    return (
      <div
        className="cell"
        style={{
          background: getCellColor(height),
          border: isSelectedCell(id) ? "1px solid red" : "none",
          cursor: "pointer",
          ...getCellPosition(position),
        }}
        key={cell.id}
        onClick={() => onClick(cell)}
      >
        {height.toFixed(2)}
      </div>
    );
  });

  return (
    <>
      <div className="grid">{grid}</div>
      <div className="cell-input">
        <input type="number" value={value} onChange={(e) => onChange(e)} />
        <button className="submit-button" onClick={onSubmit}>
          OK
        </button>
      </div>
    </>
  );
};

const HexGenerator = () => {
  return (
    <div className="container">
      <HexGrid />
    </div>
  );
};

export default HexGenerator;
