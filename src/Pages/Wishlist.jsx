import React, { useEffect, useState } from 'react'
import { addToCart, deleteWishlistProduct } from '../services/allAPI';
import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeDeleteFromWishlist } from '../redux/slices/wishlistSlice';
import { storeAddToCart } from '../redux/slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Wishlist() {
  const wishlistArray = useSelector((state) => state.wishlistReducer);
  const cartArray = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  const deleteSingleProduct = async (id,product) => {
    const response = await deleteWishlistProduct(id)
    console.log(response)
    if (response.status >= 200 && response.status < 300) {

      toast.success(`${product?.title} product has removed from wishlist`,{
        className: 'toast-message'
      })
      dispatch(storeDeleteFromWishlist(id))
    }

  }

  const addToCartFromWishlist = async (wishlist) => {
    const cartAddResponse = await addToCart(wishlist);
    if (cartAddResponse?.status >= 200 && cartAddResponse?.status < 300) {
      dispatch(storeAddToCart(wishlist))
      deleteSingleProduct(wishlist.id,wishlist)
setTimeout(() => {
  toast.success(`${wishlist?.title} product has moved to cart`,{
    className: 'toast-message'
  })
}, 3000);
      
    }
    else {
      toast.warning(`${wishlist?.title} product is already in the cart`)
    }

  }

  useEffect(() => {

  }, [wishlistArray, cartArray])

  return (
    <>
      <div className='cartContainer'>

        {wishlistArray?.length > 0 ? (
          <Row className='mt-5' >
            {wishlistArray.map((wishlist) => (
              <Col sm={12} md={6} lg={4} xl={3} >
              
                <div data-aos="zoom-in" data-aos-duration="3000" data-aos-easing="linear" style={{marginRight:'8px'}}>
                <Link to={`/products/${wishlist?.id}`} style={{textDecoration:'none'}}>
                <Card className='product-card' style={{ width: '300px',paddingBottom:'20px',borderRadius:'20px' }}>
                   <Card.Img variant="top" style={{ overflowY: 'hidden',borderRadius:'20px'}}  height={'286.094px'} width={'300px'} src={wishlist?.thumbnail} />
                </Card>  
                  <div className='text-dark product-details'>
                    <div>{wishlist?.brand}</div>
                    <div style={{ overflowY: 'hidden',color:'black',fontWeight:'bold' }}>{wishlist?.title.slice(0,20)}</div>
                    <div className='font-style'> <span style={{color:'black'}}>$ {wishlist?.price} USD</span> <span style={{ textDecoration: 'line-through',color:'grey' }}> $ {wishlist?.originalPrice}</span> <span className='text-success'>{Math.floor(wishlist?.discountPercentage)}% off</span></div>
                  </div>
                </Link>
                <div className='d-flex justify-content-between'>
                   <Button onClick={() => addToCartFromWishlist(wishlist)} className='btn btn-light' ><i className="fa-solid fa-cart-shopping text-warning fa-2x"></i></Button>
                   <Button onClick={() => deleteSingleProduct(wishlist?.id,wishlist)} className='btn btn-light'><i class="fa-solid fa-trash fa-2x text-dark"></i></Button>
                  </div>
                </div>
            
              </Col>
              ))}
          </Row>

        ) : (
          <div className='container d-flex justify-content-center align-items-center flex-column'>
            <img
              src="/images/emptywishlist1.gif"
              alt="empty wish list image"
              className='mb-2'
              height={"200px"}
              style={{ borderRadius: '50%' }}
            />
             <p className='fs-5' style={{ overflowY: 'hidden' }}>
              Your Wishlist is empty!
            </p>
            <p style={{fontSize:'15px'}}>Add items to it now</p>
            <Link to={"/"}>
              <Button className='btn button-color mt-2'>Shop Now</Button>
            </Link>
          </div>
        )}
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>

  )
}

export default Wishlist