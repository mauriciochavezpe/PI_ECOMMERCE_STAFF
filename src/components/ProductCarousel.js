import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import Loader from './layout/Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const [error,setError]= useState(null)
  const [loading,setLoading]= useState(null)
  const productTopRated = useSelector((state) => state.productTopRated)
  const { count, products } = productTopRated
  // console.log(products);

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Loader />
    // <Message variant='danger' dismissible={false}>
    //   {error}
    // </Message>
  ) : (
    <Carousel pause='hover' className='mt-2 mx-5'>
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <Link to={`/product/${product.id}`}>
            <Image src={product.image} className='width-30' alt={product.name} fluid rounded />
            <Carousel.Caption className='carousel-caption-sm'>
              <>
                <h2>{product.name}</h2>
      {/*<h5>
                  <NumberFormat
                    value={product.price}
                    displayType={'text'}
                    thousandSeparator={true}
                  />{' '}
                </h5>*/}
              </>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
