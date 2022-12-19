import { SettingOutlined, SubnodeOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import React, { useState, useEffect } from "react";

export default function SetupTable() {
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

  // Components .........................
  const AddComp = async (val) => {
    const { name, type, topic, pin } = val;
    try {
      let url = "/api/components/postComponents";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, topic, pin }),
      })
        .then((v) => {
          return v.json();
        })
        .then((e) => {
          if (e.status) {
            getData();
          }
        });
    } catch (error) {}
  };

  const DeleteComp = async (id) => {
    try {
      let url = "/api/components/deleteComponents";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((v) => {
          return v.json();
        })
        .then((e) => {
          if (e.status) {
            getData();
          }
        });
    } catch (error) {}
  };

  const [isAddComp, setIsAddComp] = useState(false);

  const types = ["switch"];

  const AddComponentForm = () => {
    return (
      <Form
        style={{ marginTop: "30px" }}
        layout="horizontal"
        onFinish={AddComp}
        validateMessages={{ required: "${label} is Required" }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select>
            {types.map((item, i) => {
              return (
                <Select.Option key={i} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Topic" name="topic" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Pin" name="pin" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
    );
  };

  //..................................

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Pin",
      dataIndex: "pin",
      key: "pin",
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Popconfirm
            title="Are you sure you want to Delete this record"
            onCancel={() => {}}
            onConfirm={() => {
              DeleteComp(record.id);
            }}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  // Setup ...................................

  const EditSetup = async (val) => {
    const { ssid, password, host, port } = val;
    try {
      let url = "/api/setup/updateSetup";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ssid, password, host, port }),
      })
        .then((v) => {
          return v.json();
        })
        .then((e) => {
          if (e.status) {
            getSetupData();
            message.success("Setup Updated");
          }
        });
    } catch (error) {}
  };

  const SetupForm = () => {
    return (
      <Form
        style={{ marginTop: "30px" }}
        layout="horizontal"
        onFinish={EditSetup}
        validateMessages={{ required: "${label} is Required" }}
      >
        <Form.Item
          label="SSID"
          name="ssid"
          initialValue={SetupData.ssid}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="PASS"
          name="password"
          initialValue={SetupData.password}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="HOST"
          name="host"
          initialValue={SetupData.host}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="PORT"
          name="port"
          initialValue={SetupData.port}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Edit <SettingOutlined />
          </Button>
        </Form.Item>
      </Form>
    );
  };
  //.....................................

  return (
    <Card className="card">
      <Tabs
        type="card"
        items={[
          {
            label: "Setup",
            key: "1",
            children: <SetupForm />,
          },
          {
            label: "Components",
            key: "2",
            children: (
              <>
                <Button
                  onClick={() => {
                    setIsAddComp(true);
                  }}
                  type="primary"
                >
                  Add Component <SubnodeOutlined />
                </Button>
                <div style={{ overflow: "auto" }}>
                  <Table
                    style={{ marginTop: "10px" }}
                    columns={column}
                    dataSource={Data}
                    
                  />
                </div>
              </>
            ),
          },
        ]}
      ></Tabs>
      <Modal
        open={isAddComp}
        onCancel={() => {
          setIsAddComp(false);
        }}
        centered={true}
        footer={null}
      >
        <AddComponentForm />
      </Modal>
    </Card>
  );
}
