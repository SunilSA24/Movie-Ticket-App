import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import type { UserLogin } from "../models/authCall.model";
import { login } from "../apiCalls/authCalls";


function Login() {
  const onSubmit = async (value: UserLogin) => {
    try {
      const data = await login(value);
      if (data.success) {
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error: any) {
      message.error(error.message || 'Something went wrong');
    }
  }
  return (
    <>
      <Form layout="vertical" onFinish={onSubmit} className="auth-form">
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
            LogIn
          </Button>
        </Form.Item>
      </Form>

      <div className="auth-footer">
        <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
      </div>
    </>
  )
}

export default Login