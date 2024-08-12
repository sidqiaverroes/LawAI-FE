import React from 'react';
import { Form, Input, Button, Typography, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;
const { TabPane } = Tabs;

const Auth = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { login } = useAuth();

  const handleFinish = async (values) => {
    try {
      // Simulate a delay as if waiting for an actual API response
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      // Check if the username and password match the expected values
      if (values.username === 'test' && values.password === 'test123') {
        // Mock successful response data
        const data = {
          access_token: 't1e2s3t',
        };

        // Handle success
        login(values.username, data.access_token);
        message.success('Login successful!');
      } else {
        // Handle failure
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      // Handle errors
      message.error('Login failed!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Title level={2} className="text-center mb-6">Welcome!</Title>
        <Tabs defaultActiveKey="login" centered>
          <TabPane tab="Login" key="login">
            <Form
              form={form}
              name="login"
              onFinish={handleFinish}
              className="space-y-4"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-500" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-500" />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form
              form={form}
              name="register"
              onFinish={handleFinish}
              className="space-y-4"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-500" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-500" />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
