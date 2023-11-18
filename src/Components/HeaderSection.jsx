import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './HeaderSection.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { filterProducts } from '../redux/slices/allProductsSlice';
import { Badge } from '@mui/material';


function HeaderSection() {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cartReducer)
    const wishlist = useSelector((state) => state.wishlistReducer)
    const [searchValue, setSearchValue] = useState('')

    const getSearchValue = (e) => {
        const { value } = e.target
        setSearchValue(value.trim())

    }

    const searchSubmit = () => {
        if (searchValue) {
            dispatch(filterProducts(searchValue))
            setSearchValue("")
        }
        else {
            toast.warning(`Please insert a value`)
        }
        // console.log(searchValue);

    }

    useEffect(() => {

    }, [cart, wishlist])

    return (
        <>
            <Navbar expand="lg" className="shadow nav-bgcolor navbar-style position-fixed">
                <Container  style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Navbar.Brand>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <img src='/images/logo.png' alt='logo of Asco' height={'40px'}/>
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='option-list'>

                        <Nav>


                            <Form className="d-flex search-field">
                            <input type="text" className='form-control border rounded me-2' onChange={getSearchValue} value={searchValue}
                                    style={{ width: '450px',backgroundColor:'ghostwhite' }} placeholder='Search for Products'/>
                                <Button onClick={searchSubmit} style={{marginLeft:'-58px'}} className='search-button'><i class="mt-1 fa-solid fa-magnifying-glass"></i></Button>
                            </Form>

                            <Nav.Link className='btn rounded link-style'>
                                <Link to={'/wishlist'} className='d-flex align-item-center link-items' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                                    <Badge className='ms-2' badgeContent={wishlist.length} color='primary'>Wishlist
                                    <i className='fa-solid fa-heart text-danger ms-2 mt-1'>
                                    </i>
                                    </Badge>
                                </Link>
                            </Nav.Link>

                            <Nav.Link className='btn rounded link-style'>
                                <Link to={'/cart'} className='d-flex align-item-center link-items' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                                    
                                    <Badge className='ms-2' badgeContent={cart.length} color="warning">Cart
                                    <i className='fa-solid fa-cart-shopping text-warning ms-2 mt-2'>
                                    </i>
                                    </Badge>
                                </Link>
                            </Nav.Link>
                            {/* <Nav.Link>
                                <Button variant="info" className='text-dark fw-bold'>Cart
                                    <i className="fa-solid fa-cart-shopping cart-icon mx-1">
                                        <Badge className='badge-count text-dark bg-transparent'>2</Badge>
                                    </i>
                                </Button>
                            </Nav.Link> */}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </>
    )
}

export default HeaderSection