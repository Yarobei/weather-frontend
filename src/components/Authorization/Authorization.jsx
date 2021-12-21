import React, { useState } from "react";
import { Form, Input, Button, message, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import shallow from "zustand/shallow";

import { Logo } from "../Logo/Logo";

import { login } from "../../service/auth/auth.service";

import { useAuthStore } from "../../store/auth.store";

import style from "./authorization.module.scss";

export const Authorization = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setIsAuthorized } = useAuthStore(
    (state) => ({
      isAuthorized: state.isAuthorized,
      setIsAuthorized: state.setIsAuthorized,
    }),
    shallow
  );

  const authorize = async (values) => {
    setIsLoading(true);
    const response = await login(values);
    if (response.ok) {
      setIsAuthorized(true);
    } else {
      message.error(response.statusText);
    }
    setIsLoading(false);
  };

  return (
    <Form className={style.wrap} onFinish={authorize}>
      <Space direction={"vertical"} size={"large"} align={"center"}>
        <Logo />
        <Space direction={"vertical"} align={"center"}>
          <Form.Item
            name={"username"}
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input placeholder={"Username"} prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input
              type={"password"}
              placeholder={"Password"}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Button htmlType={"submit"} type={"primary"} loading={isLoading}>
            Login
          </Button>
        </Space>
      </Space>
    </Form>
  );
};
