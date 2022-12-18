import { Card } from "antd";
import React, { useState } from "react";

export default function Switch({ data, publish }) {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    if (isOn) {
      publish({ topic: data.topic, val: "OFF" });
      setIsOn(false);
    } else {
      publish({ topic: data.topic, val: "ON" });
      setIsOn(true);
    }
  };
  return (
    <Card
      className="card"
      hoverable
      onClick={handleClick}
      style={{ background: isOn ? "lightgreen" : "tomato" }}
    >
      {data.name}
    </Card>
  );
}
