import React from "react";
import Session from "react-session-api";

const IncreaseButton = () => {
  const onIncrease = () => {
    Session.set("counter", 1);
  };
  return (
   <button onClick={onIncrease}>Test</button>
  );
};

export default IncreaseButton;