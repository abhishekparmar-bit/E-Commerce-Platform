// ProductDetails.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  return (
    <div className="container">
      <div className="product">
        
        <img src={product.image} alt={product.name} width="300" />

        <div>
          <h2>{product.name}</h2>
          <h3>₹{product.price}</h3>
          <p>{product.description}</p>
          <p>Rating ⭐ {product.rating}</p>
          <p>Stock: {product.stock}</p>

          <button>Add to Cart</button>
          <button>Buy Now</button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;