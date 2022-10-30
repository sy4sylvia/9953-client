import React, { useState } from 'react';
import {Carousel, Col, Row} from 'antd';

import 'antd/dist/antd.css';

function Home(){

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const style = {
        background: '#0092ff',
        padding: '8px 0',
    };

    return (
        <div>
            <h1>
                Home page - content sample
            </h1>

            <div>
                <Carousel autoplay style={{padding: '150px 250px'}}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>

                <div style={{padding: '10px 120px'}} >
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

            </div>

        </div>

    )
};

export default Home;
