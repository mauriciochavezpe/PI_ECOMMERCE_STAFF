import React from 'react'
import PropTypes from 'prop-types'




const Rating = ({ count  }) => {

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < count) {
      stars.push(<span key={i} className="star">&#9733;</span>); // Estrella llena (✩)
    } else {
      stars.push(<span key={i} className="star">&#9734;</span>); // Estrella vacía (☆)
    }
  }


  return <div className="star-rating">{stars}</div>;
}
/*
Rating.defaultProps = {
  isSmall: true,
  my: 'my-3',
}*/

Rating.propTypes = {
  value: PropTypes.number,
  isSmall: PropTypes.bool
}

export default Rating
