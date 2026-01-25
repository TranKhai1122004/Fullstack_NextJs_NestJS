'use client';

import { AdminContext } from '@/library/admin.context';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Dropdown, Space, Typography, Avatar } from 'antd';
import { useContext } from 'react';
import type { MenuProps } from 'antd';
import { signOut } from 'next-auth/react';

const { Text } = Typography;

const AdminHeader = (props: any) => {
    const { session } = props;

    const { Header } = Layout;
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <span>Setting</span>,
        },
        {
            key: '2',
            danger: true,
            label: <span onClick={() => signOut()}>Sign out</span>,
        },
    ];

    const username = session?.user?.email?.split('@')[0] ?? '';

    return (
        <Header
            style={{
                padding: 0,
                display: 'flex',
                background: '#f5f5f5',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {/* LEFT: COLLAPSE BUTTON */}
            <Button
                type="text"
                icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapseMenu(!collapseMenu)}
                style={{
                    fontSize: 16,
                    width: 64,
                    height: 64,
                }}
            />

            {/* RIGHT: USER DROPDOWN */}
            <Dropdown menu={{ items }}>
                <div
                    style={{
                        cursor: 'pointer',
                        marginRight: 24,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Space size={10}>
                        <Avatar
                            size={32}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#1677ff' }}
                        />

                        <div style={{ lineHeight: 1.2 }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Welcome
                            </Text>
                            <br />
                            <Text strong style={{ fontSize: 14 }}>
                                {username}
                            </Text>
                        </div>

                        <DownOutlined style={{ fontSize: 12 }} />
                    </Space>
                </div>
            </Dropdown>
        </Header>
    );
};

export default AdminHeader;
