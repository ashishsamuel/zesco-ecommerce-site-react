import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../redux/slices/allProductsSlice';


function Home() {
    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.allProductsReducer.allProducts)
    console.log(allProducts);
    const filteredProducts = useSelector((state)=>state.allProductsReducer.filteredProducts)
    console.log(filteredProducts);

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [])

    return (
        <>
            <div className='homeContainer'>
                <Row style={{marginBottom:'6rem'}}>
                <Col sm={12} md={12} lg={6} xl={6}>
                        <div className='landingImage'>
                            <img className='landing-img' src="/images/offer-image.png" alt="" />
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={6} xl={6}>
                        <div data-aos="fade-up-right" className='landingContent'>
                            <div className='landingTitle'>
                                Winter Clothing New Arrivals
                            </div>
                            <div className='landingParagraph'>
                            Be Fashionable in the Cold!
                            <p className='my-3 fw-bold'>Up to 60% Off</p>
                            <p className='my-3 fw-bold'>From $ 100</p>
                            </div>
                            <div className='landingButton'>
                                Shop now
                            </div>

                        </div>
                    </Col>
                    
                </Row>
                <Row className='mt-5'>
                    {filteredProducts?.length > 0 ? filteredProducts.map((product) => (
                        <Col data-aos="fade-zoom-in" sm={12} md={6} lg={4} xl={3} className='mb-4 product-col'>
                            <Link to={`/products/${product?.id}`} className='product-link' style={{textDecoration:'none'}}> 
                            <Card data-aos="fade-right" className='product-card' style={{ width: '300px',paddingBottom:'20px',borderRadius:'20px' }}>
                                <Card.Img variant="top" style={{ overflowY: 'hidden',borderRadius:'20px'}}  height={'286.094px'} width={'300px'} src={product?.thumbnail} />
                            </Card>
                            <div className='text-dark product-details'>
                                    <div>{product?.brand}</div>
                                    <div style={{ overflowY: 'hidden',color:'black',fontWeight:'bold' }}>{product?.title.slice(0,20)}</div>
                                    <div className='font-style'> <span style={{color:'black'}}>$ {product?.price} USD</span> <span style={{ textDecoration: 'line-through',color:'grey' }}> $ {product?.originalPrice}</span> <span className='text-success'>{Math.floor(product?.discountPercentage)}% off</span></div>
                                </div>
                            </Link>
                        </Col>               
                    ))
                        : allProducts?.length > 0 ? allProducts.map((product) => (
                            <Col data-aos="fade-zoom-in" sm={12} md={6} lg={4} xl={3} className='mb-4'>
                            <Link to={`/products/${product?.id}`} className='product-link' style={{textDecoration:'none'}}> 
                            <Card data-aos="fade-right" className='product-card' style={{ width: '300px',borderRadius:'20px' }}>
                                <Card.Img variant="top" style={{ overflowY: 'hidden',borderRadius:'20px'}} height={'286.094px'} width={'300px'} src={product?.thumbnail} />
                                
                            </Card>
                            <div className='text-dark product-details'>
                                    <div>{product?.brand}</div>
                                    <div style={{ overflowY: 'hidden',color:'black',fontWeight:'bold' }}>{product?.title.slice(0,20)}</div>
                                    <div className='font-style'> <span style={{color:'black'}}>$ {product?.price} USD</span> <span style={{ textDecoration: 'line-through',color:'grey' }}> $ {product?.originalPrice}</span> <span className='text-success'>{Math.floor(product?.discountPercentage)}% off</span></div>
                                </div>
                            </Link>
                        </Col>
                        
                    )):<p> content nothing to display</p>
                    }
                    
                </Row>
            </div>

        </>
    )
}

export default Home