import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Layout, Menu, Popconfirm, ConfigProvider, Avatar, Space } from 'antd';
import { UserOutlined, CloudSyncOutlined } from '@ant-design/icons';
import zhCN from "antd/es/locale/zh_CN";
import store from 'store';
import ajax from '../common/Ajax';

import { navList } from './BaseData';
import { MyNavLink } from '../component';

const { Header, Content, Footer, Sider } = Layout;

export default function MainContent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const username = store.get('username');

    const handleConfirm = async () => {
        try {
            await ajax.post('/logout');
            store.remove('web_disk_token');
            store.remove('username');
            window.location.href = '/login';
            setIsLoggedIn(false);
        } catch (err) {
            throw new Error(err);
        }
    }

    return (
        <>
            <ConfigProvider locale={zhCN}>
                <Layout>
                    <Header className='header'>
                        <div className="box">
                            <div className='left'>
                                <Space>
                                    <CloudSyncOutlined className='icon' />
                                    <span className='title'>壹度网盘</span>
                                </Space>

                            </div>
                            <div className='right'>
                                <Avatar
                                    style={{
                                        backgroundColor: '#87d068',
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <a className='username' href="#">{username}</a>
                                &nbsp;&nbsp;
                                {isLoggedIn ? (
                                    <Popconfirm
                                        title="确认退出？"
                                        onConfirm={handleConfirm}
                                        okText="确认"
                                        cancelText="取消"
                                        placement='leftBottom'
                                    >
                                        <a className='logout' href='#'>退出</a>
                                    </Popconfirm>


                                ) : (
                                    <p>请先登录</p>
                                )}

                            </div>
                        </div>
                    </Header>
                    <Layout className='sider-content-layout'>
                        <Sider className='sider'>
                            <Menu mode='inline' defaultSelectedKeys={['1']}>
                                {navList.map((item, index) => {
                                    return (
                                        <Menu.Item key={item.key} icon={item.icon}>
                                            <MyNavLink to={item.path}>{item.title}</MyNavLink>
                                        </Menu.Item>
                                    )
                                })}
                            </Menu>
                        </Sider>
                        <Content className='content'>
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </>
    )
}