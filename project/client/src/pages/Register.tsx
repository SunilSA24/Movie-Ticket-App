import { Button, Form, Input} from "antd";
import { Link } from "react-router-dom"
import { register } from "../apiCalls/authCalls";
import type { UserRegiseter } from "../models/authCall.model";

function Register() {
    const onSubmit = async(values: UserRegiseter) => {
        try {
            const data = await register(values);
            console.log('data', data)
        } catch (error) {
            
        }
    }
  return (
    <>
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
    </>
    
  )
}

export default Register