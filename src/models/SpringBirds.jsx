import React from "react";
import SpringBird from "./SpringBird";

const SpringBirds = () => {
  return (
    <>
      <SpringBird position={[-7, 12, 6]} />
      <SpringBird position={[-5, 12, 8]} />
      <SpringBird position={[-3, 12, 6]} />
    </>
  );
};

export default SpringBirds;
