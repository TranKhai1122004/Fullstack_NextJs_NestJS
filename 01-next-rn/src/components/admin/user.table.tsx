'use client';

import { handleDeleteUserAction } from "@/utils/actions";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, Typography } from "antd";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react";
import UserCreate from "./user.create";
import UserUpdate from "./user.update";

const { Title, Text } = Typography;

interface IProps {
    users: any[];
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    };
    role: 'ADMIN' | 'USER';
}

const UserTable = (props: IProps) => {
    const {
        users,
        meta = {
            current: 1,
            pageSize: 10,
            total: 0,
            pages: 0,
        },
        role,
    } = props;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    // =======================
    // COLUMNS
    // =======================
    const columns: any[] = [
        {
            title: <Text strong>STT</Text>,
            width: 80,
            align: 'center',
            render: (_: any, __: any, index: number) =>
                (index + 1) + (meta.current - 1) * meta.pageSize,
        },
        {
            title: <Text strong>ID</Text>,
            dataIndex: "_id",
            render: (value: string) => (
                <Text style={{ fontSize: 13 }}>{value}</Text>
            ),
        },
        {
            title: <Text strong>Email</Text>,
            dataIndex: "email",
            render: (value: string) => (
                <Text style={{ fontSize: 14 }}>{value}</Text>
            ),
        },
        {
            title: <Text strong>Actions</Text>,
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    <EditTwoTone
                        twoToneColor="#fa8c16"
                        style={{ cursor: "pointer", fontSize: 18, marginRight: 16 }}
                        onClick={() => {
                            setIsUpdateModalOpen(true);
                            setDataUpdate(record);
                        }}
                    />

                    <Popconfirm
                        placement="leftTop"
                        title="Xác nhận xóa user"
                        description="Bạn có chắc chắn muốn xóa user này?"
                        onConfirm={async () =>
                            await handleDeleteUserAction(record?._id)
                        }
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <DeleteTwoTone
                            twoToneColor="#ff4d4f"
                            style={{ cursor: "pointer", fontSize: 18 }}
                        />
                    </Popconfirm>
                </>
            ),
        },
    ];

    // =======================
    // PAGINATION
    // =======================
    const onChange = (pagination: any) => {
        if (pagination?.current) {
            const params = new URLSearchParams(searchParams);
            params.set("current", pagination.current);
            replace(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <>
            {/* HEADER */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <Title level={4} style={{ margin: 0 }}>
                    User Management
                </Title>

                {role === 'ADMIN' && (
                    <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
                        Create User
                    </Button>
                )}
            </div>

            {/* TABLE */}
            <Table
                bordered
                dataSource={users}
                columns={columns}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => (
                        <Text type="secondary">
                            {range[0]}-{range[1]} trên {total} users
                        </Text>
                    ),
                }}
                onChange={onChange}
            />

            {/* ADMIN CREATE */}
            {role === 'ADMIN' && (
                <UserCreate
                    isCreateModalOpen={isCreateModalOpen}
                    setIsCreateModalOpen={setIsCreateModalOpen}
                />
            )}

            {/* UPDATE (ADMIN + USER) */}
            <UserUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
};

export default UserTable;
