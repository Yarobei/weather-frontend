import React, { useEffect } from "react";
import { Modal, Typography, Form, Input, Space } from "antd";

export const AddCityModal = ({ isOpen, handleClose, handleAddCity }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
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
            <Input placeholder={"City name *"} />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};
