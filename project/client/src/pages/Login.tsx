import { Button, Card, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { UserLogin } from "../models/authCall.model";
import { login } from "../apiCalls/authCalls";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/user";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (value: UserLogin) => {
    try {
      const data = await login(value);
      if (data.success) {
        message.success(data.message);
        dispatch(setUserData(data.user));
        navigate('/home');
      } else {
        message.error(data.message);
      }
    } catch (error: any) {
      message.error(error.message || 'Something went wrong');
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card" title="Sign in">
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
              placeholder="Enter your password"
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
              Log In
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="auth-link">Sign up</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Login