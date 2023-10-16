import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Rating from './Rating'
import AddToCartBtn from './AddToCartBtn'

const Product = ({ product }) => {
  return (
    <Card style={{ width: '18rem' }} className="mb-4">
      <Link to={`/product/${product.id}`}> 
      <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.description.length > 30 ?
            `${product.description.slice(0,30)}...` :  
            `${product.description}`   
        } 
        </Card.Text>
        <Card.Text as='h5' className='mb-3'>
          Precio: S/. {product.price}
        </Card.Text>
        <Rating
            count={2}
          />
        <AddToCartBtn disabled={product.countInStock === 0} id={product.id} />
      </Card.Body>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product
