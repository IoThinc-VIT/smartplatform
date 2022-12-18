import { Col, Row } from "antd";
import Head from "next/head";
import MainLayout from "../components/layout/mainLayout";
import SetupCode from "../components/views/setup/SetupCode";
import SetupPanel from "../components/views/setup/SetupPanel";
import SetupTable from "../components/views/setup/SetupTable";

export default function Setup() {
  return (
    <>
      <Head>
        <title>Setup Page</title>
        <meta name="description" content="IoThinc VIT- Smart Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/iothinc_logo.png" />
      </Head>
      <MainLayout>
        <Row>
          <Col span={24}>
            <SetupPanel />
          </Col>
          <Col style={{ marginTop: "15px" }} span={24}>
            <Row>
              <Col span={12}>
                <SetupTable />
              </Col>
              <Col span={1} />
              <Col span={11}>
                <SetupCode />
              </Col>
            </Row>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
