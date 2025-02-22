import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Header, Sider } = Layout

const items = [
    {
        label: 'home',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: 'articles management',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: 'publish',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const MyLayout = () => {
    const navigate = useNavigate()
    const onMenuClick = (route) => {
        console.log('click', route)
        const path = route.key
        navigate(path)
    }

    // Get the current route path
    const location = useLocation()
    console.log(location.pathname)
    const selectedkey = location.pathname

    // Trigger the user action
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(fetchUserInfo())
    }, [dispatch])

    // log out and refresh home page
    const onConfirm = () => {
        console.log('log out')
        // dispatch(clearUserInfo())
        navigate('/')
    }

    // const username = useSelector(state => state.user.userInfo.username)
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">login</span>
                    <span className="user-logout">
                        <Popconfirm title="do you want to log out" okText="log out" cancelText="cancel" onConfirm={onConfirm}>
                            <LogoutOutlined /> log out
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedkey}
                        onClick={onMenuClick}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* render the secondary routes here */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default MyLayout