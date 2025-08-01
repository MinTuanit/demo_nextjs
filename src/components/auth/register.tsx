'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';

const Register = () => {
  const route = useRouter();
  const onFinish = async (values: any) => {
    const { email, password, name } = values;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      body: {
        email,
        password,
        name,
      },
    });
    if (res?.data) {
      route.push(`/verify/${res?.data?._id}`);
    } else {
      alert("Registration failed: " + res?.message);
      console.error(res);
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{
          padding: "15px",
          margin: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}>
          <legend>Register</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}><ArrowLeftOutlined /> Back to Homepage</Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Already have an account?<Link href={"/auth/login"}>Login</Link>
          </div>

        </fieldset>
      </Col>
    </Row>

  )
}

export default Register;
