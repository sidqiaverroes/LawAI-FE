import React, { useState } from 'react';
import { Form, Input, Button, Typography, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const { Title } = Typography;
const { TabPane } = Tabs;

const Auth = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { login } = useAuth(); // Destructure login from useAuth
  const [activeTab, setActiveTab] = useState('login'); // Track active tab

  const handleLogin = async (values) => {
    try {
      const response = await fetch('https://deekyudev.my.id/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();

      // Store token in cookies
      Cookies.set('access_token', data.access_token, { expires: 1, secure: true, sameSite: 'Lax' });

      // Update auth context
      login(values.username, data.access_token);

      message.success('Login successful!');
      router.push('/');
    } catch (error) {
      message.error('Login failed!');
      console.error('Error:', error);
    }
  };

  const handleRegister = async (values) => {
    try {
      const { username, password } = values;
      const response = await fetch('https://deekyudev.my.id/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          name: username, // Same as username
          username,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Call login after successful registration
      const loginResponse = await fetch('https://deekyudev.my.id/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      if (!loginResponse.ok) {
        throw new Error('Login failed after registration');
      }

      const data = await loginResponse.json();

      // Store token in cookies
      Cookies.set('access_token', data.access_token, { expires: 1, secure: true, sameSite: 'Lax' });

      // Update auth context
      login(values.username, data.access_token);

      message.success('Registration successful and logged in!');
      router.push('/');
    } catch (error) {
      message.error('Action failed!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Title level={2} className="text-center mb-6">Welcome to Law AI!</Title>
        <Tabs
          activeKey={activeTab}
          onChange={key => setActiveTab(key)}
          centered
        >
          <TabPane tab="Login" key="login">
            <Form
              form={form}
              name="login"
              onFinish={handleLogin}
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
              onFinish={handleRegister}
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
