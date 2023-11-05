import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart, addToWishlist, getSingleProduct } from '../services/allAPI'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { storeAddToCart } from '../redux/slices/cartSlice';
import { storeAddToWishlist } from '../redux/slices/wishlistSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewProduct.css'

function ViewProduct() {

  const { id } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({})
  const getProductById = async () => {
    const { data } = await getSingleProduct(id)
    data.price = Math.floor(data.originalPrice * (data.discountPercentage / 100))
    setProduct(data)
  }

  useEffect(() => {
    getProductById()
  }, [])

  const addProductToCart = async (product) => {
    const cartResponse = await addToCart(product)
    if (cartResponse.status >= 200 && cartResponse.status < 300) {
      dispatch(storeAddToCart(product))
      toast.success(`${product?.title} product has moved to cart`,{
        className:'toast-message'
      })
      navigate("/cart")
    }
    else {
      toast.warning(`${product?.title} product is already in the cart`,{
        className:'toast-message'
      })
    }

  }

  const addProductToWishlist = async () => {
    const wishlistResponse = await addToWishlist(product)
    if (wishlistResponse.status >= 200 && wishlistResponse.status < 300) {
      dispatch(storeAddToWishlist(product))
      toast.success(`${product?.title} product has moved to wishlist`,{
        className:'toast-message'
      })
      navigate("/wishlist")
    } else {
      toast.warning(`${product?.title} product is already in the wishlist`,{
        className:'toast-message'
      })
    }

  }

  // console.log(id);
  return (
    <>
      <div className='container mt-5 mb-5'>
        <Row>
          <Col sm={12} md={6} lg={6} xl={6}
          >
            <div className='d-flex flex-column'>
              <img src={product?.thumbnail} alt="" className='thumbnail-img rounded'  />
              <div className='d-flex justify-content-evenly mt-3 product-button'>
                <Button onClick={() => addProductToCart(product)} className='btn button-color fw-bold button-margin'><i className='fa-solid fa-cart-shopping text-warning me-2 mt-2'>
                                    </i>Add to Cart</Button>
                <Button onClick={() => addProductToWishlist(product)} className='btn button-color fw-bold button-margin'><i className='fa-solid fa-heart text-danger ms-2 mt-1'>
                                    </i> Add to Wishlist</Button>
              </div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={6} xl={6}
          >
            <div>
              <h2 className='m-3 product-title'>{product?.brand}</h2>
              <div className='m-3'>{product?.title}</div>
              <h3 className='m-3 product-price'> <span style={{color:'black'}}>$ {product?.price} </span> <span style={{ textDecoration: 'line-through',fontSize:'20px',color:'grey' }}> $ {product?.originalPrice}</span><span style={{fontSize:'20px',color:'#42c91d'}}> {Math.floor(product?.discountPercentage)}% off</span></h3>
              <div className='m-3'>Rating {product?.rating} <i class="fa-solid fa-star" style={{ color: '#42c91d' }}></i></div>
              
              <div className='d-flex flex-column mt-3'>
                <p className='m-3' style={{fontWeight:'bold'}}>Available Offers</p>
                <p className='m-3'>
                <i class="fa-solid fa-tag" style={{color:'#42c91d'}}></i>
                 <span className='p-1'>
                    ₹10 one-time sale fee may apply for top deals
                    Coupons for you
  
                 </span>
                </p>
                
                <p className='m-3'>
                <i class="fa-solid fa-tag" style={{color:'#42c91d'}}></i>
                  <span className='p-1'>
                    Special PriceGet extra 13% off on 50 item(s) (price inclusive of cashback/coupon)T&C
                    Available offers
                  </span>

                </p>

                <p className='m-3'>
                <i class="fa-solid fa-tag" style={{color:'#42c91d'}}></i>
                  <span className='p-1'>Bank Offer10% Instant Discount on ICICI Bank Cardless EMI Txns, up to ₹1500, on orders of ₹5000 and aboveT&C</span>
                </p>


                <p className='m-3'>
                <i class="fa-solid fa-tag" style={{color:'#42c91d'}}></i>
                  <span className='p-1'>Bank Offer10% Instant Discount on ICICI Bank Credit Card Txns, up to ₹1250, on orders of ₹5000 and aboveT&C</span>
                </p>

                <p className='m-3'>
                <i class="fa-solid fa-tag" style={{color:'#42c91d'}}></i>
                  <span className='p-1' style={{textAlign:'justify'}}>
                    Bank Offer10% Instant Discount on ICICI Bank Credit Card EMI Txns, up to ₹1500, on orders of ₹5000 and aboveT&C
                  </span>
                </p>

              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default ViewProduct
