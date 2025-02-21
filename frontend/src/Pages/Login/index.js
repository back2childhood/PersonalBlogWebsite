import "@ant-design/v5-patch-for-react-19"
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, message } from "antd";
import logo from '../../assets/logo.png';
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";

const Login = () => {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [error, setError] = useState(null);
    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError(null);

    //     try {
    //         const response = await fetch("http://localhost:8080/login", {  // Ensure correct API endpoint
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ username, password })
    //         });

    //         console.log(response);
    //         const data = await response.data;
    //         if (response.status === 401) {
    //             setError('Invalid credentials, please try again.');
    //             return;
    //         }
    //         // alert("Login successful!" + response.message);
    //         navigate('/experts');
    //     } catch (err) {
    //         alert("Login failed!" + err.message);
    //         // setError(err.message);
    //     }
    // };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log(values);
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
                        <Input size="large" placeholder="username" onChange={(e) => setUsername(e)} />
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
