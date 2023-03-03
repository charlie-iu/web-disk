import React from 'react';
import {Form, Input, Checkbox, Button, message,} from 'antd';
import {useNavigate} from 'react-router-dom';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { Ajax } from '../common';
import '../css/register.css';
import axios from 'axios';

export default function Register(props) {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = (values) => {
        const { username, password, nickname } = values;

       axios.post('api/register', {username, password, nickname}).then(({data})=>{
        if(data.code === 0) {
            message.success(data.message,1);
            navigate('/login');
        }
       }).catch(err =>{
        if(err.response.data.code === 1) {
            message.error('用户名已存在！');
            return;
        }
        throw new Error(err);
       });
    };
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const particlesInit = async (main) => {
        await loadFull(main);
    };
    const particlesOptions = {
        background: {
            color: {
                value: "#000",
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
                value: "#ffa39e",
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
        <div className='register-box'>
            <Form           
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                className='register-form'
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: '请输入您的用户名!', whitespace: true }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="nickname"
                    label="昵称"
                    tooltip="登录成功后显示的昵称"
                    rules={[{ required: true, message: '请输入一个昵称!', whitespace: true }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的密码!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次输入您的密码!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致，请重新输入!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议书')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        我已阅读用户<span>协议书</span>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
            <Particles
                init={particlesInit}
                options={particlesOptions}
            />
        </div>
    )
}
