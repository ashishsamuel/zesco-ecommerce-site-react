import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Cart.css';
import { deleteCartProduct } from '../services/allAPI';
import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { storeDeleteToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {
  const cartArray = useSelector((state) => state.cartReducer);
  //  console.log(cartArray)
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const deleteSingleProduct = async (id,cart) => {
    const response = await deleteCartProduct(id)
    if (response.status >= 200 && response.status < 300) {
      dispatch(storeDeleteToCart(id))
      getCartTotal()
      toast.success(`Successfully removed ${cart?.title} from your cart`,{
        className: 'toast-message'
      })

    }
  }

  const getCartTotal = () => {
    console.log(cartArray)
    if (cartArray?.length > 0) {
      setTotal(cartArray?.map(item => item?.price).reduce((p1, p2) => p1 + p2))
    }
    else {
      setTotal(0)
    }
  }

  useEffect(() => {
    getCartTotal()
  }, [cartArray])

  return (

    <>
      <div className='cartContainer'>

        {cartArray?.length > 0 ? (
          <Row className='mt-5' >
            
            <Col className='d-flex flex-wrap mb-4 product-col align-items-center' sm={12} md={8} lg={8} xl={8} >
            {cartArray.map((cart) => (
                <div data-aos="zoom-in" data-aos-duration="3000" data-aos-easing="linear" style={{marginRight:'8px'}}>
                  <Link to={`/products/${cart?.id}`} style={{textDecoration:'none'}}>
                  <Card className='product-card' style={{ width: '300px',paddingBottom:'20px',borderRadius:'20px' }}>
                     <Card.Img variant="top" style={{ overflowY: 'hidden',borderRadius:'20px'}}  height={'286.094px'} width={'300px'} src={cart?.thumbnail} />
                  </Card>  
                    <div className='text-dark product-details'>
                      <div>{cart?.brand}</div>
                      <div style={{ overflowY: 'hidden',color:'black',fontWeight:'bold' }}>{cart?.title.slice(0,20)}</div>
                      <div className='font-style'> <span style={{color:'black'}}>$ {cart?.price} USD</span> <span style={{ textDecoration: 'line-through',color:'grey' }}> $ {cart?.originalPrice}</span> <span className='text-success'>{Math.floor(cart?.discountPercentage)}% off</span></div>
                    </div>
                  </Link>

                    <div className='delete-button'>
                  <Button onClick={() => deleteSingleProduct(cart?.id,cart)} className='btn btn-light'><i class="fa-solid fa-trash fa-2x text-dark"></i></Button>
                  </div>
                </div>
              ))}
            </Col>
            


            <Col className='' sm={12} md={4} lg={3} xl={4}>
              <div className='border p-3 rounded shadow' data-aos="fade-right" data-aos-duration="3000" data-aos-easing="linear">
                <p style={{ overflowY: 'hidden',color:'grey' }} className='fs-6 text-uppercase fw-bold'>Price Details</p>
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                  <p>Total Products</p>
                  { cartArray.length>1 ?
                  <p>{cartArray.length} items</p>
                  :<p>{cartArray.length} item</p>
                  }
              
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <p>Price</p>
                  <p>${total}</p>
                  
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <p>Delivery Charges</p> &nbsp;
                  <p> <span style={{color:'#42c91d'}} className='me-1'>(Free Delivery)</span>$0</p>
                  
                </div>
               
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                <p>Total Amount</p> &nbsp;
                  <p> <span style={{color:'#42c91d'}} className='me-1'></span>${total}</p>
                </div>

                <div className='d-flex justify-content-end'>
                  <button className='btn button-color fw-bold text-uppercase'>Place Order</button>
                </div>
               
              </div>
            </Col>
          </Row>

        ) : (
          <div className='container d-flex justify-content-center align-items-center flex-column'>
            <img
              src="/images/addtoyourcart.gif"
              alt="empty wish list image"
              className='mb-2'
              height={"200px"}
              style={{ borderRadius: '50%' }}
            />
            <p className='fs-5' style={{ overflowY: 'hidden' }}>
              Your cart is empty!
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

export default Cart