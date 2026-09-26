import { Button, Card, Form, Input, message} from "antd";
import { Link, useNavigate } from "react-router-dom"
import { register } from "../apiCalls/authCalls";
import type { UserRegiseter } from "../models/authCall.model";

function Register() {
    const navigate = useNavigate();
    const onSubmit = async(values: UserRegiseter) => {
        try {
            const data = await register(values);
            console.log('data', data);
            if(data.success) {
              message.success(data.message);
              navigate('/login');
            } else {
              message.error(data.message);
            }
        } catch (error: any) {
            message.error(error.message || "Something went wrong");
        }
    }
  return (
    <div className="auth-page">
      <Card className="auth-card" title="Create Account">
        <Form layout="vertical" onFinish={onSubmit} className="auth-form">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input
              size="large"
              placeholder="Enter your full name"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required!" },
              { type: 'email', message: "Please enter a valid email" }
            ]}
          >
            <Input
              size="large"
              type="email"
              placeholder="Enter your email"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required!" },
              { min: 6, message: "Password must be at least 6 characters" }
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Create a password"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              size="large"
              className="auth-button"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
        </div>
      </Card>
    </div>
  )
}

export default Register