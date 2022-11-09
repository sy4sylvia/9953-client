import 'antd/dist/antd.css';

const COLUMNS = [
    {
        title: 'Order ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Order Priority',
        dataIndex: 'priority',
        key: 'priority',
    },
    {
        title: 'Order Date',
        dataIndex: 'orderDate',
        key: 'orderDate',
    },
    {
        title: 'Ship Date',
        key: 'shipDate',
        dataIndex: 'shipDate',
    },
    {
        title: 'Total',
        key: 'total',
        dataIndex: 'total',
    },
];

const DATA = [
    {
        key: '1',
        id: 'IN-2014-JR162107-41675',
        priority: 'Critical',
        orderDate: '02/04/2014',
        shipDate: '02/07/2014',
        total: '$805.98'
    },
];

export { COLUMNS, DATA };