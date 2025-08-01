'use client'
import { useHasMounted } from '@/utils/customHook';
import { Button, Form, message, Modal, Input, Steps } from 'antd';
import { SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/api';

const ModalReactive = (props: any) => {
  const { isModalOpen, setIsModalOpen, userEmail } = props;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const hashMouted = useHasMounted();

  useEffect(() => {
    if (userEmail) {
      form.setFieldsValue({ username: userEmail });
    }
  }, [userEmail]);

  if (!hashMouted) {
    return <></>
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishStep0 = async (values: any) => {
    const { username } = values;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/retry-active`,
      body: {
        email: username,
      }
    });
    if (res?.data) {
      setCurrent(1);
      message.success("Đã gửi mã kích hoạt đến email của bạn");
    } else {
      message.error("Gửi mã kích hoạt thất bại: " + res?.message);
      console.error(res);
    }
  }

  return (
    <>
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: 'Login',
              // status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Verification',
              // status: 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Done',
              status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />
        <div style={{ marginTop: 24 }}>
          {current === 0 && (
            <>
              <div style={{ margin: '20px 0' }}>Tài khoản bạn chưa được kích hoạt</div>
              <Form
                name="verify"
                autoComplete="off"
                layout='vertical'
                form={form}
                onFinish={onFinishStep0}
              >
                <Form.Item
                  name="username"
                  label="Email"
                >
                  <Input disabled value={userEmail} />
                </Form.Item>

                <Form.Item
                >
                  <Button type="primary" htmlType="submit">
                    Resend
                  </Button>
                </Form.Item>
              </Form>
            </>

          )}
          {current === 1 && (
            <Form
              name="verify1"
              // onFinish={onFinish}
              autoComplete="off"
              layout='vertical'
            >
              <Form.Item
                label="Id"
                name="_id"
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
                    message: 'Please input your code!',
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
          )}
          {current === 2 && (
            <div>2</div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default ModalReactive;