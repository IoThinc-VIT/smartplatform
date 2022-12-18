import React, { useState, useEffect } from "react";
import {
  ApiOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [height, setHeight] = useState(600);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    //calculating ideal height for all devices
    //total height - 2*height of header + 16px
    setHeight(window.innerHeight - 64 * 2 + 16);
  }, []);

  const navList = [
    {
      key: "1",
      icon: <ProjectOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: "2",
      icon: <ApiOutlined />,
      label: <Link href="/setup">Setup</Link>,
    },
  ];

  return (
    <main>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            // style={{
            //   height: "32px",
            //   margin: "16px",
            //   background: "rgba(255, 255, 255, 0.3)",
            //   // backgroundImage: "url(iothinc_logo.png)",
            // }}
            className="logo"
            style={{ margin: "5px", marginLeft: collapsed ? "5px" : "30px" }}
          />
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            items={navList}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: height,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
