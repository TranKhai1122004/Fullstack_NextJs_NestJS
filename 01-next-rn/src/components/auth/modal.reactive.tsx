'use client';
import { sendRequest } from '@/utils/api';
import React, { useState } from 'react';
import { Modal, Steps, Form, Button, Input, notification } from 'antd';
import {
    UserOutlined,
    SafetyCertificateOutlined,
    CheckCircleFilled,
} from '@ant-design/icons';
import { useHasMounted } from '@/utils/customHook';


const ModalReactive = (props: any) => {
    const { isModalOpen, setIsModalOpen, userEmail } = props;
    const [current, setCurrent] = useState(0);
    const hasMounted = useHasMounted();
    const [userId, setUserId] = useState("");
    if (!hasMounted) return null;
    const onFinishStep0 = async (values: any) => {
        const { email } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
            method: "POST",
            body: {
                email
            }
        })
        if (res?.data) {
            setUserId(res?.data?._id);
            setCurrent(1);
        } else {
            notification.error({
                message: "Call API error",
                description: res?.message
            })
        }



    }

    const onFinishStep1 = async (values: any) => {
        const { code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            method: "POST",
            body: {
                code, _id: userId
            }
        })
        if (res?.data) {
            setCurrent(2);
        } else {
            notification.error({
                message: "Call API error",
                description: res?.message
            })
        }



    }
    return (
        <Modal
            title="Activate account"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={false}
            footer={null}
        >
            <div
                style={{
                    background: '#fafafa',
                    padding: 24,
                    borderRadius: 12,
                }}
            >
                <Steps
                    current={current}
                    size="small"
                    items={[
                        {
                            title: 'Login',
                            status: 'finish',
                            icon: <UserOutlined />,
                        },
                        {
                            title: 'Verification',
                            // status: 'process',
                            icon: <SafetyCertificateOutlined />,
                        },
                        {
                            title: 'Completed',
                            // status: 'wait',
                            icon: <CheckCircleFilled />,
                        },
                    ]}
                />
                {current === 0 &&
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Your account has not been activated</p>
                        </div>
                        <Form
                            name="verify"
                            onFinish={onFinishStep0}
                            autoComplete="off"
                            layout='vertical'
                        >
                            <Form.Item

                                name="email"
                                initialValue={userEmail}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Resend
                                </Button>
                            </Form.Item>
                        </Form>
                    </>}
                {current === 1 &&
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Please enter the verification code</p>
                        </div>
                        <Form
                            name="verify"
                            onFinish={onFinishStep1}
                            autoComplete="off"
                            layout='vertical'
                        >
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
                                <Input />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Active
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                }
                {current === 2 &&
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Your account is now active. Please log in again to continue</p>
                        </div>
                    </>
                }
            </div>
        </Modal>
    );
};

export default ModalReactive;
