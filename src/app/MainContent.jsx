import React from 'react';
import {   Outlet} from "react-router-dom";
import { Layout, Menu } from 'antd';
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { navList } from './BaseData';
import { MyNavLink } from '../component';
const { Header, Content, Footer, Sider } = Layout;

export default function MainContent(props) {
    return (
        <>
            <ConfigProvider locale={zhCN}>
                <Layout>
                    <Header className='header'>
                        <div className='logo'>                          
                            <span className='title'>壹度网盘</span>
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