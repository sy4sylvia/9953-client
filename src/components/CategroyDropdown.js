import React from 'react';
import { Dropdown, Menu, message, Space, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

import { FURNITURE, OFFICE, TECHNOLOGY } from './CategoryItems'

const onClickFurniture = ({ key }) => {
    message.info(`Click on furniture item ${key}`);
};

const onClickOffice = ({ key }) => {
    message.info(`Click on office item ${key}`);
};

const onClickTechnology = ({ key }) => {
    message.info(`Click on tech item ${key}`);
};

const furnitureMenu = (
    <Menu
        onClick={onClickFurniture}
        items={ FURNITURE }
    />
);

const officeMenu = (
    <Menu
        onClick={onClickOffice}
        items={ OFFICE }
    />
);

const techMenu = (
    <Menu
        onClick={onClickTechnology}
        items={ TECHNOLOGY }
    />
);

const CategoryDropdown = () => (
    // TODO: change the styling a bit
    <div>
        <Row>
            <Dropdown overlay={furnitureMenu}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Furnitures
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Row>

        <Row>
            <Dropdown overlay={officeMenu}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Office Supplies
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Row>

        <Row>
            <Dropdown overlay={techMenu}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Technology
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Row>

    </div>
);
export default CategoryDropdown;