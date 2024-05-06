import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import Loader from './layout/Loader'
import Message from './Message'
//import { listTopProducts } from '../actions/productActions'
import { getAllProducts } from "../store/slice/product";

import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";

const generateRandomText = () => {
  return "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i"};

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const [error,setError]= useState(null)
  const [loading,setLoading]= useState(null)

  useEffect(() => {
    // dispatch(listTopProducts())
    dispatch(getAllProducts(""));

  }, [dispatch])

  const banners = [
    { id: 1, image: banner1 },
    { id: 2, image: banner2 },
    { id: 3, image: banner3 },
  ];

  return loading ? (
    <Loader />
  ) : error ? (
    <Loader />
    // <Message variant='danger' dismissible={false}>
    //   {error}
    // </Message>
  ) : (
    <Carousel pause='hover'  >
    {banners.map((banner) => (
      <Carousel.Item key={banner.id}>
        <img
          className='d-block w-100'
          src={banner.image}
          alt={`Banner ${banner.id}`}
        />
      </Carousel.Item>
    ))}
  </Carousel>
  )
}

export default ProductCarousel
