import React from 'react';
import { Typography, Carousel, Col, Image, Row} from 'antd';

import 'antd/dist/antd.css';
import '../index.css'

import {IMAGEURLS} from './ProductInfo';

const {Title} = Typography;

function Home(){

    return (
        <div>
            <div>
                <Carousel
                    autoplay
                    dotPosition={"bottom"}
                    style={{padding: '100px'}}>
                    <div>
                        <Image
                            width={400}
                            src={IMAGEURLS[0]}
                        />
                    </div>
                    <div>
                        <Image
                            width={400}
                            src={IMAGEURLS[1]}
                        />
                    </div>
                    <div>
                        <Image
                            width={400}
                            src={IMAGEURLS[2]}
                        />
                    </div>
                    <div>
                        <Image
                            width={400}
                            src={IMAGEURLS[3]}
                        />
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
                            <Image
                                width={200}
                                src={IMAGEURLS[0]}
                            />
                            <Title
                                className='product-title'
                                level={5}
                            >
                                Elvarli Wardrobe White
                            </Title>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Image
                                width={200}
                                src={IMAGEURLS[1]}
                            />
                            <Title
                                className='product-title'
                                level={5}
                            >
                                Aurdal Wardrobe White
                            </Title>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Image
                                width={200}
                                src={IMAGEURLS[2]}
                            />
                            <Title
                                className='product-title'
                                level={5}
                            >
                                Aurdal Wardrobe Light
                            </Title>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Image
                                width={200}
                                src={IMAGEURLS[3]}
                            />
                            <Title
                                className='product-title'
                                level={5}
                            >
                                Aurdal Wardrobe Dark
                            </Title>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Home;
