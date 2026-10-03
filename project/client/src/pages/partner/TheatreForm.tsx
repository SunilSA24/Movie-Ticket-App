import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import type { Theatre } from "../../models/theatre.model";
import { addTheatre, updateTheatre } from "../../apiCalls/theatreCalls";
import type { User } from "../../models/user.model";




interface TheatreFormProps {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  selectedTheatre?: Theatre | null;
  formType: "add" | "edit";
  userData: User;
}

function TheatreForm({
  isModalOpen,
  setModalOpen,
  selectedTheatre,
  formType,
  userData,
}: TheatreFormProps) {
  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (values: Theatre) => {
    if (!userData || !userData._id) {
      message.error("User data not available. Please login again");
      return;
    }

    if (formType === "add") {
      const theatre: Theatre = {
        ...values,
        owner: userData._id,
      };

      const response = await addTheatre(theatre);
      console.log("Add theatre", response);
      message.success("Theatre added successfully");
    } else {
      const theatre: Theatre = {
        ...selectedTheatre,
        ...values,
        _id: selectedTheatre?._id ?? values._id,
        owner: selectedTheatre?.owner ?? userData._id,
      };

      const response = await updateTheatre(theatre);
      console.log("Update theatre", response);
      message.success("Theatre updated successfully");
    }

    setModalOpen(false);
  };

  return (
    <Modal
      width={700}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      title={formType === "edit" ? "Edit Theatre" : "Add Theatre"}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={handleSubmit}
        initialValues={selectedTheatre ?? undefined}
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


