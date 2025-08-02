'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, message, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';

const Verify = (props: any) => {
  const { id } = props;
  const route = useRouter();

  const onFinish = async (values: any) => {
    const { _id, code } = values;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-code`,
      body: {
        _id,
        code,
      },
    });
    console.log(res);
    if (res?.data) {
      alert("Active successfully");
      route.push(`/auth/login`);
    } else {
      alert("Active failed: " + res?.message);
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
          <legend>Activate Account</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
          >
            <Form.Item
              label="Id"
              name="_id"
              initialValue={id}
              hidden
            >
              <Input disabled />
            </Form.Item>
            <div>
              A code has been sent to your email. Please enter the code to activate your account.
            </div>
            <Form.Item
              label="Code"
              name="code"
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
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}><ArrowLeftOutlined /> Back to Homepage</Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Already have an account? <Link href={"/auth/login"}>Login</Link>
          </div>

        </fieldset>
      </Col>
    </Row>

  )
}

export default Verify;