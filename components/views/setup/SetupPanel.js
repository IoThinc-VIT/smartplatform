import { Card, Col, Image, Row } from "antd";
import React from "react";

export default function SetupPanel() {
  return (
    <div
      className="card"
      style={{ padding: "10px", border: "1px solid lightgrey" }}
    >
      <Row>
        <Col span={18}></Col>
        <Col span={6}>
          Pin Out{"  "}
          <Image
            width={30}
            style={{ borderRadius: "5px", border: "0.1px solid lightgrey" }}
            src="/ESP32_Pinout.png"
            alt="esp32 pinout"
          />
        </Col>
      </Row>
    </div>
  );
}
