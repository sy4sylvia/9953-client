import 'antd/dist/antd.css';

const COLUMNS = [
    {
        title: 'Order ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Products',
        dataIndex: 'products',
        key: 'products',
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
    },
    {
        title: 'Order Priority',
        dataIndex: 'orderPriority',
        key: 'orderPriority',
    },
    {
        title: 'Order Date',
        dataIndex: 'orderDate',
        key: 'orderDate',
    },
    {
        title: 'Shipping Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Ship Mode',
        dataIndex: 'shipMode',
        key: 'shipMode',
    },
    {
        title: 'Arrival Date',
        dataIndex: 'arrivingDate',
        key: 'arrivingDate',
    },
];

export { COLUMNS };