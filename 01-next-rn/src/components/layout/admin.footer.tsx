'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                TrKhai ©{new Date().getFullYear()} Created by TrKhai
            </Footer>
        </>
    )
}

export default AdminFooter;