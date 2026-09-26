import { Button, Col, Form, Input, Modal, Row } from "antd";
// import type { Theatre } from "../models/theatre.model";


interface TheatreFormProps {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
//   selectedTheatre?: Theatre;
//   formType: string;
//   setSelectedTheatre: (theatre?: Theatre) => void;
}

function TheatreForm({
  isModalOpen,
  setModalOpen,
}: TheatreFormProps) {

  const handleCancel = () => {
    setModalOpen(false);
    // setSelectedTheatre(undefined);
  };

//   const handleSubmit = async (values: {
//     _id?: string;
//     name: string;
//     address: string;
//     email: string;
//     phone: number;
//   }) => {
//     if (formType === "add") {
//       console.log("Add theatre", values);
//       message.success("Theatre added successfully");
//     } else {
//       console.log("Update theatre", { ...values, _id: selectedTheatre?._id });
//       message.success("Theatre updated successfully");
//     }
//     setModalOpen(false);
//     setSelectedTheatre(undefined);
//   };

  return (
    <Modal width={700} open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form
        layout="vertical"
        style={{ width: "100%" }}
      >
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              name="name"
              rules={[{ required: true, message: "Theatre name is required!" }]}
            >
              <Input placeholder="Enter theatre name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required!" }]}
            >
              <Input placeholder="Enter theatre address" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required!" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter theatre email" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Phone number is required!" }]}
            >
              <Input type="number" placeholder="Enter phone number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button block type="primary" htmlType="submit" style={{ fontWeight: 600 }}>
            Submit
          </Button>
          <Button onClick={handleCancel} className="mt-3" block>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TheatreForm;