import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();

  const handleProceedCheckout = () => {
    //console.log("Place Order Clicked");
    // setCart([]);
    // setOrderPlaced(true);
    // processOrder();

    history.push("/shipment");
  };

  const handleRemoveProduct = (productKey) => {
    //console.log("Product Removed", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productkeys = Object.keys(savedCart);
    //const counts = Object.values(savedCart);
    const cartProducts = productkeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });

    setCart(cartProducts);
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }

  return (
    <div className="twin-container">
      <div className="product-container">
        {/* <h1>Cart Items: {cart.length}</h1> */}
        {cart.map((product) => (
          <ReviewItem
            key={product.key}
            handleRemoveProduct={handleRemoveProduct}
            product={product}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="buy-btn">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
