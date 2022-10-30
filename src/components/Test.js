import { Col, Divider, Row } from 'antd';
import React from 'react';
const style = {
    background: '#0092ff',
    padding: '8px 0',
};
const Test = () => (
    <div>
        <Row
            gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}
        >
            <Col className="gutter-row" span={6}>
                <div style={style}>product-1</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>product-2</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>product-3</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>product-4</div>
            </Col>
        </Row>

    </div>
);
export default Test;