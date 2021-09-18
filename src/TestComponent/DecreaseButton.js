import React from "react";
import Session from "react-session-api";

const DecreaseButton = () => {
  const onDecrease = () => {
    let counter = Session.get("counter");
    Session.set("counter", counter-1);
  };
  return (
    <button className="btn btn-sm btn-danger" onClick={e => onDecrease()}>
      Decrease Number
    </button>
  );
};

export default DecreaseButton;
