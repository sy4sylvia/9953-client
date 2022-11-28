import React, { useEffect, useState } from 'react';
import {Table, Typography} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FURNITURE, OFFICE, TECHNOLOGY } from './CategoryItems'
const { Title } = Typography;

const searchURL = 'http://localhost:8080/api/product/search';
const productURL = 'http://localhost:8080/api/product/';

const getItem = (text, value) => {
    return { text, value,};
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
        render: (text) => <a onClick={() => console.log('clicked')}>{text}</a>,
        sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
        title: 'Category',
        dataIndex: 'subcategory',
        filters: [
            {
                text: 'Furniture',
                value: 'Furniture',
                children: furnitureChildren
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
            } else {
                return record.subcategory.indexOf(value) === 0;
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

const Results = () => {
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

    const searchText = localStorage.getItem('searchText');

    const fetchProducts = () => {
        console.log('called');
        setLoading(true);
        axios.get(searchURL, {params: {q: searchText}})
            .then(function (response) {
                console.log('response on the results page axios', response);
                if (response.status === 200) {
                    setData(response.data);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: response.data.length, // total count before the filter
                        },
                    });
                    //refresh the page if already at the /results
                    navigate('/results');
                    // window.location.reload();
                } else {
                    alert('Please log in before you search for a product.');
                    navigate('/login');
                }
            }).catch((error) => alert(error));
    };

    useEffect(() => {
        fetchProducts();
    }, [JSON.stringify(tableParams)]);

    const fetchSingleProduct = (productId) => {
        console.log('called fetchSingleProduct');
        axios.get(productURL + productId)
            .then(function (response) {
                if (response.status === 200) {
                    // stringify the object and store in the local storage
                    localStorage.setItem('curProduct', JSON.stringify(response.data));
                    navigate('/product');
                } else {
                    alert('Please log in before you search for a product.');
                    navigate('/login');
                }
            }).catch((error) => alert(error));
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    return (
        <div>
            <Title
                style={{
                    marginTop: '36px',
                }}
            >
                Search Results
            </Title>
            <Table
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            fetchSingleProduct(record.id);
                        }, // click row
                        // onDoubleClick: event => {}, // double click row
                        // onContextMenu: event => {}, // right button click row
                        // onMouseEnter: event => {}, // mouse enter row
                        // onMouseLeave: event => {}, // mouse leave row
                    };
                }}
            />
        </div>
    )
};
export default Results;