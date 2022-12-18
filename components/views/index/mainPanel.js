import { Button, Card } from "antd";
import React from "react";

export default function MainPanel({ ConnectMqtt, isConnected }) {
  return (
    <Card className="card">
      <Button
        onClick={() => {
          ConnectMqtt();
        }}
        style={{ background: isConnected ? "lightgreen" : "blue" }}
        type="primary"
      >
        {isConnected ? "Connected" : "Connect"}
      </Button>
    </Card>
  );
}
