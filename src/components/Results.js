import React from 'react';
import {Table, Typography} from 'antd';
import { FURNITURE, OFFICE, TECHNOLOGY } from './CategoryItems'
import _ from 'lodash';

const { Title } = Typography;

function getItem(text, value) {
    return {
        text,
        value,
    };
}

const furnitureChildren = [];
const officeChildren = [];
const techChildren = [];

_.forEach(FURNITURE, function(obj) {
    furnitureChildren.push(getItem(obj.label, obj.key));
});

_.forEach(OFFICE, function(obj) {
    officeChildren.push(getItem(obj.label, obj.key));
});

_.forEach(TECHNOLOGY, function(obj) {
    techChildren.push(getItem(obj.label, obj.key));
});


const columns = [
    {
        title: 'Product Name',
        dataIndex: 'productName',
        sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
        title: 'Category',
        dataIndex: 'subcategory',
        filters: [
            {
                text: 'Furniture',
                value: 'Furniture',
                children: [
                    {
                        text: 'All',
                        value: 'Furniture',
                    },
                    {
                        text: 'Bookcases',
                        value: 'Bookcases',
                    },
                    {
                        text: 'Chairs',
                        value: 'Chairs',
                    },
                    {
                        text: 'Furnishings',
                        value: 'Furnishings',
                    },
                    {
                        text: 'Tables',
                        value: 'Tables',
                    },
                ]
            },
            {
                text: 'Office',
                value: 'office',
                children: officeChildren
            },
            {
                text: 'Technology',
                value: 'technology',
                children: techChildren
            },
        ],
        onFilter: (value, record) => {
            // Filter on the three categories
            if (value === 'Furniture' || value === 'Office' || value === 'Technology') {
                console.log('record category', record.category);
                return record.category.indexOf(value) === 0;
            }
        }
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount - b.discount,
    },
    {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.unitPrice - b.unitPrice,
    },

];

const data = [
    {
        key: '1',
        productName: 'John Brown',
        unitPrice: 32,
        discount: 0.4,
        category: 'Office',
        subcategory: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        productName: 'Jim Green',
        unitPrice: 42,
        discount: 0.4,
        category: 'Office',
        subcategory: 'Tables London No. 1 Lake Park',
    },
    {
        key: '3',
        productName: 'Joe Black',
        unitPrice: 32,
        discount: 0.4,
        category: 'Furniture',
        subcategory: 'Furniture Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        productName: 'Jim Red',
        unitPrice: 32,
        discount: 0.4,
        category: 'Furniture',
        subcategory: 'London No. 2 Lake Park',
    },
];
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const Results = () => {
    return (
        <div>
            <Title
                style={{
                    marginTop: '36px',
                }}
            >
                Search Results
            </Title>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
};
export default Results;