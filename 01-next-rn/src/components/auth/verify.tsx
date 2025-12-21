'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, message, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';


const Verify = (props: any) => {
    const { id } = props;
    const router = useRouter();

    const onFinish = async (values: any) => {
        const { _id, code } = values;

        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            method: "POST",
            body: {
                _id, code
            }
        })
        console.log("Check res: ", res);
        if (res?.data) {
            message.success("Your account has been activated successfully!");
            router.push(`/auth/login`);
        } else {
            notification.error({
                message: "Verify error",
                description: res?.message
            })
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
                    <legend>Activate Your Account</legend>
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
                        <div>A verification code has been sent to the email address you registered.</div>
                        <Divider />
                        <Form.Item
                            label="Verification Code"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your verification code',
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
                    <Link href={"/"}><ArrowLeftOutlined />Back to the Home Page</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Already have an account? <Link href={"/auth/login"}>Sign in</Link>
                    </div>

                </fieldset>
            </Col>
        </Row>

    )
}
export default Verify;