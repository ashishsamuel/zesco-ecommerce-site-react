import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './FooterSectio.css';
import { Link } from 'react-router-dom'
function FooterSection() {
    return (
        <>
            <div className='footerContainer'>
                <Row>
                    <Col data-aos="fade-right" sm={12} md={6} lg={4} xl={3} className='d-flex flex-column section-left p-3'>
                        <div>
                            <i className="fa-solid fa-phone me-3"></i>
                            +00 123 456 789
                        </div>
                        <div>
                            <i className="fa-regular fa-envelope me-3"></i>
                            support@zesco.com
                        </div>
                        <div>
                            <i className="fa-solid fa-location-dot me-3"></i>
                            Zesco Private Limited,<br />
                            Centura Builings,<br />
                            Tensec Road, Villesel <br />
                            Serilees, 45785 <br />
                            Texas, USA
                        </div>
                        <div style={{ padding: '0px' }}>
                            <ul className="d-flex" style={{ justifyContent: 'space-evenly', alignItems: 'center', padding: '10px 0px' }}>
                                <li><a><i className="fa-brands fa-facebook fa-1x" style={{ color: 'white' }}></i></a></li>
                                <li><a><i className="fa-brands fa-instagram fa-1x" style={{ color: 'white' }}></i></a></li>
                                <li><a><i className="fa-brands fa-whatsapp fa-1x" style={{ color: 'white' }}></i></a></li>
                                <li><a><i className="fa-brands fa-twitter fa-1x" style={{ color: 'white' }}></i></a></li>

                            </ul>
                        </div>
                    </Col>

                    <Col sm={12} md={6} lg={4} xl={3} className='d-flex flex-column p-3' data-aos="fade-right">
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                            ABOUT
                        </div>
                        <ul className="section-list" style={{ paddingLeft: '0px' }}>
                            <li> <a>Contact Us</a></li>
                            <li> <a>About Us</a></li>
                            <li> <a>Careers</a></li>
                            <li> <a>Zesco Stories</a></li>
                            <li> <a>Zesco Wholesale</a></li>
                            <li> <a>Corporate Information</a></li>
                        </ul>
                    </Col>
                    <Col data-aos="fade-right" sm={12} md={6} lg={4} xl={3} className='d-flex flex-column p-3'>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                            HELP
                        </div>
                        <ul className="section-list" style={{ paddingLeft: '0px' }}>
                            <li><a>Payments</a></li>
                            <li><a>Shipping</a></li>
                            <li><a>Cancellation & Returns</a></li>
                            <li><a>FAQ</a></li>
                            <li><a>Report Infringement</a></li>
                        </ul>
                    </Col>
                    <Col data-aos="fade-right" sm={12} md={6} lg={4} xl={3} className='d-flex flex-column p-3'>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                            CONSUMER POLICY
                        </div>
                        <ul className="section-list" style={{ paddingLeft: '0px' }}>
                            <li><a>Cancellation & Returns</a></li>
                            <li><a>Terms Of Use</a></li>
                            <li><a>Security</a></li>
                            <li><a>Privacy</a></li>
                            <li><a>Sitemap</a></li>
                            <li><a>Greivance Redressal</a></li>
                            <li><a>EPR Compliance</a></li>
                        </ul>
                    </Col>
                </Row>
            </div >
        </>
    )
}

export default FooterSection