import { Card, Col, Row } from "antd";
import React from "react";
import Switch from "./components/switch";

export default function MainControl({ Data, publish }) {
  return (
    <Card className="card" style={{ marginTop: "15px" }}>
      <p style={{fontSize:"25px"}}>Switch</p>
      <Row gutter={[16, 16]}>
        {Data.map((val, i) => {
          return (
            <Col key={i}>
              <Switch data={val} publish={publish} />
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}
