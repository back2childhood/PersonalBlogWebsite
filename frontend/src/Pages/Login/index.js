import "@ant-design/v5-patch-for-react-19"
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, message } from "antd";
import logo from '../../assets/logo.png';
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("values: " + values);
        dispatch(fetchLogin(values));
        navigate('/');
        message.success("login successfully");
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="logo" />
                {/* For the async validation scenario, high frequency of verification will cause backend pressure. 
                You can change the verification timing through validateTrigger */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
