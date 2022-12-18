import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, message } from "antd";
import { useState } from "react";
import { useEffect } from "react";

export default function SetupCode() {
  const [Data, setData] = useState([]);
  const [SetupData, setSetupData] = useState({
    ssid: "",
    password: "",
    host: "",
    port: "",
  });

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

  let relayList = "";
  let relayObject = "";
  for (let i = 0; i < Data.length; i++) {
    relayList += `R${i + 1}`;
    if (i != Data.length - 1) {
      relayList += ", ";
    }
    relayObject += `Light R${i + 1}(${Data[i].name}, ${Data[i].topic}, ${
      Data[i].pin
    });\n`;
  }

  const baseCode = `
#include<WiFi.h>
#include <PubSubClient.h>

//wifi credentials
const char* ssid = "${SetupData.ssid}";
const char* password = "${SetupData.password}";
//mqtt broker credentials
const char* host = "${SetupData.host}";
const int port = ${SetupData.port};

//light Class Component
class Light {
  public:
    String title;
    char * topic;
    int pin;
    Light(String x, char * y, int z) {
      title = x;
      topic = y;
      pin = z;
    };
    void mqttSwitch(String message) {
      if (message == "ON") {
        digitalWrite(pin, HIGH);
      } else if (message == "OFF") {
        digitalWrite(pin, LOW);
      }
    }
};
//Relay details (title, Mqtt-topic, Arduino-pin)

${relayObject}

const int num_relays = ${Data.length};
Light Relays[${Data.length}] = {${relayList}};

WiFiClient esp32;
PubSubClient client(esp32);

void mqttConnect() {
  while (!client.connected()) {
    String clientId = "ESP32Client_" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("Mqtt Connected");
      //subscribe topic
      for (int i = 0; i < num_relays; i++) {
        client.subscribe(Relays[i].topic);
      }
    } else {
      delay(500);
    }
  }
}


void onMessageRecieved(char* topic, byte* payload, unsigned int length) {
  String Topic = topic;
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  for (int i = 0; i < num_relays; i++) {
    if ((String)Relays[i].topic == Topic) {
      Relays[i].mqttSwitch(message);
    }
  }


}
void setup() {
  //setting all realys as output
  for (int i = 0; i < num_relays; i++) {
    pinMode(Relays[i].pin, OUTPUT);
  }
  Serial.begin(115200);
  //wifi setup
  WiFi.mode(WIFI_STA);
  Serial.println("Starting WiFi connection..");
  WiFi.begin(ssid, password);

  //wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println(".");
  Serial.println("WiFi Connected");
  //mqtt setup
  Serial.println("Starting MQTT connection..");
  client.setServer(host, port);
  client.setCallback(onMessageRecieved);

}

void loop() {
  // put your main code here, to run repeatedly:
  if (!client.connected()) {
    mqttConnect();
  }
  client.loop();
}  
`;

  // copy to clipboard function
  function handleCopyTextFromParagraph() {
    const cb = navigator.clipboard;
    const paragraph = baseCode;
    cb.writeText(paragraph).then(() => message.success("Code copied"));
  }

  return (
    <Card className="card">
      SetupCode{" "}
      <Button
        type="primary"
        onClick={() => {
          getData();
          getSetupData();
        }}
      >
        Refresh
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button icon={<CopyOutlined/>} onClick={handleCopyTextFromParagraph}>Copy</Button>
      <br />
      <br />
      <div id="code" style={{ overflowY: "auto", maxHeight: "350px" }}>
        <p>{baseCode}</p>
      </div>
    </Card>
  );
}
