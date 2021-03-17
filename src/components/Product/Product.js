import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  //console.log(props);
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <p>
          <small>by: {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left - Order Soon</small>
        </p>
        {props.showAddToCart === true && (
          <button
            onClick={() => props.handleAddProduct(props.product)}
            className="buy-btn"
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
