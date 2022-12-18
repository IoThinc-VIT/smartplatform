import { Col, message, Row } from "antd";
import Head from "next/head";
import mqtt from "mqtt";
import MainLayout from "../components/layout/mainLayout";
import MainControl from "../components/views/index/mainControl";
import MainPanel from "../components/views/index/mainPanel";
import { useEffect, useState } from "react";

export default function Home() {
  const [Data, setData] = useState([]);
  const [SetupData, setSetupData] = useState({
    ssid: "",
    password: "",
    host: "",
    port: "",
  });

  const [client, setClient] = useState();
  const [isConnected, setIsConnected] = useState(false);

  const getData = async () => {
    try {
      let url = "/api/components/getComponents";
      await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((v) => {
          return v.json();
        })
        .then((e) => {
          if (e.status) {
            setData(e.data);
          }
        });
    } catch (error) {}
  };

  const getSetupData = async () => {
    try {
      let url = "/api/setup/getSetup";
      await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((v) => {
          return v.json();
        })
        .then((e) => {
          if (e.status) {
            setSetupData(e.data);
          }
        });
    } catch (error) {}
  };

  useEffect(() => {
    getData();
    getSetupData();
  }, []);

  const ConnectMqtt = () => {
    // const host = `ws://${SetupData.host}:${SetupData.port}/mqtt`;
    const host = `ws://${SetupData.host}:8000/mqtt`;
    setClient(
      mqtt.connect(host, {
        clientId: `mqttjs_ + ${Math.random().toString(16)}`,
      })
    );
  };

  const mqttPublish = ({ topic, val }) => {
    if (client) {
      client.publish(topic, String(val));
    }
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        message.success("Mqtt Connected");
        //subscribe to topic after connection success
        for (let i = 0; i < Data.length; i++) {
          client.subscribe(Data[i].topic);
        }
        setIsConnected(true);
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
        setIsConnected(false);
      });
      client.on("reconnect", () => {
        console.log("Reconnecting");
        if (isConnected) {
          setIsConnected(false);
        }
      });
    }
  }, [client]);

  return (
    <>
      <Head>
        <title>IoThinc VIT Smart Home</title>
        <meta name="description" content="IoThinc VIT- Smart Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/iothinc_logo.png" />
      </Head>
      <MainLayout>
        <Row>
          <Col span={24}>
            <MainPanel ConnectMqtt={ConnectMqtt} isConnected={isConnected} />
          </Col>
          <Col span={24}>
            <MainControl Data={Data} publish={mqttPublish} />
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
