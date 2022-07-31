import React from 'react';
import {
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import LOGO from '../img/cloud-sync.svg';
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
                            <img src={LOGO} alt='' />
                            <span>壹度网盘</span>
                        </div>
                    </Header>
                    <Layout>
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
                            {/* <Routes>
                                {
                                    navList.map(item => {
                                        return <Route path={item.path} element={item.component} key={item.key} />
                                    })
                                }
                            </Routes> */}
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </>
    )
}