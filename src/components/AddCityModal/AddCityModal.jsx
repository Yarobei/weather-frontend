import React, { useEffect, useRef } from "react";
import { Modal, Typography, Form, Input, Space } from "antd";

export const AddCityModal = ({ isOpen, handleClose, handleAddCity }) => {
  const [form] = Form.useForm();

  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    } else {
      setTimeout(() => inputRef?.current.focus(), 0);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    handleAddCity(values["city-name"]);
  };

  return (
    <Modal visible={isOpen} onCancel={handleClose} onOk={handleSubmit}>
      <Space direction={"vertical"} align={"center"} style={{ width: "100%" }}>
        <Typography>Enter city name</Typography>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name={"city-name"}
            rules={[{ required: true, message: "City name is required" }]}
          >
            <Input ref={inputRef} placeholder={"City name *"} />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};
