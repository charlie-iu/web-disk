import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import store from 'store';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import axios from "axios";
import { MyNavLink } from "../component";
import '../css/login.css';

export default function Login(props) {
    const [state, setState] = useState({
        username: '',
        password: '',
        rememberMe: true,
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(state => {
            return {
                ...state,
                [name]: value
            };
        });
    };
    const handleCheckChange = (e) => {
        const { checked } = e.target;
        setState(state => {
            return {
                ...state,
                rememberMe: checked
            };
        });
    };
    const onFinish = (values) => {
        const { username, password } = values;
        axios.post('/api/login/', { username, password }).then(({ data }) => {
            if (data.code === 0) {
                store.set('web_disk_token', data.token);
                navigate('/');
                message.success('欢迎登录!');
            }
        }).catch(err => {
            return Promise.reject(err);
        })
    }
    const particlesInit = async (main) => {
        await loadFull(main);
    };
    const particlesOptions = {
        background: {
            color: {
                value: "#0f0304",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    };

    return (
        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    username: 'admin',
                    password: '123456',
                    rememberMe: state.rememberMe,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的用户名!',
                        },
                    ]}
                >
                    <Input
                        value={state.username}
                        name='username'
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="用户名"
                        allowClear
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                >
                    <Input.Password
                        name="username'"
                        value={state.password}
                        maxLength={16}
                        allowClear
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="密码"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item className="remember-forget">
                    <Checkbox checked={state.rememberMe} onChange={handleCheckChange}>
                        记住我
                    </Checkbox>
                    <a href="javascript:void 0;" className="forget">
                        忘记密码？
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <MyNavLink className='register' to='/register'>没有账号？立马注册!</MyNavLink>
                </Form.Item>
            </Form>
            <Particles
                init={particlesInit}
                options={particlesOptions}
            />
        </div>
    )
}
