import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, decrementByAmount} from '../../redux/cartCounter';
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import { QUERY_ME } from "../../utils/queries";
import {ADD_TO_CART, ADD_TO_CART_QUANTITY, UPDATE_PRODUCT_INVENTORY} from "../../utils/mutations"
import Auth from "../../utils/auth";
import "../../styles/singleProduct.css"

function SingleProduct() {
  const { productId } = useParams();
  const product = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productId }
  });
  const inventory = product.data?.product.inventory

  const me = useQuery(QUERY_ME);
  let loggedInCartItems = me.data?.me.cartItems

  const [addToCartQuantity, {addQuantError}] = useMutation(ADD_TO_CART_QUANTITY)

  const [size, setSize] = useState("")
  const handleSizeSelect = (size, sizeId, priceId) => {
    setSize(`${size},${sizeId},${priceId}`);
  };
  const sizeFields = size.split(',')
  const sizeName = sizeFields[0]
  const sizeId = sizeFields[1]
  const sizePriceId = sizeFields[2]

  console.log("__________________________________________")
  console.log("CartProductId", productId)
  console.log("product name", product.name)
  console.log("image", product.image)
  console.log("price", product.price)
  console.log("priceId", product.priceId)
  console.log("sizeId", sizeId )
  console.log("sizeName", sizeName )
  console.log("sizePriceId", sizePriceId )
  console.log("__________________________________________")

  const [addCartItem, {error}] = useMutation(ADD_TO_CART)
  const [updateProductInventory, {err}] = useMutation(UPDATE_PRODUCT_INVENTORY);

  const [cartBtnText, setCartBtnText] = useState("ADD TO CART")
  const showCheckMark = () => {
    setCartBtnText("Adding")
    setTimeout(removeCheckMark, 1500)
  }
  const removeCheckMark = () => {
    setCartBtnText("ADD TO CART")
  }
////////// cart count /////////////////
  const localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  let count = 0
  if(localCartItems) {
    for ( let i=0; i < localCartItems.length; i++) {
      count += parseInt(localCartItems[i].cartProductQuantity)
    }
  }
////////////////////////////////////////
  const dispatch = useDispatch();

  const handleAddToCart = async (event) => {
    event.preventDefault();

    const cartProductId = productId;
    const cartProductSizeId = sizeId;
    const duplicateCartItem = loggedInCartItems.find(loggedInCartItem => loggedInCartItem.cartProductId === cartProductId && loggedInCartItem.cartProductSizeId === cartProductSizeId)

    if(duplicateCartItem) {
      try {
        await addToCartQuantity({
          variables: {
            userId: Auth.getProfile().data._id,
            cartId: duplicateCartItem._id,
            cartProductQuantity: 1
          },
          refetchQueries: [
            {
              query: QUERY_ME,
              variables: {
                cartProductId
              }
            }
          ]
        });
        await updateProductInventory({
          variables: {
            productId: cartProductId,
            sizeId: cartProductSizeId,
            cartProductQuantity: 1
          },
          refetchQueries: [
            {
              query: QUERY_SINGLE_PRODUCT,
              variables: {
                productId
              }
            }
          ]
        })
        setSize("");
        showCheckMark();
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        await addCartItem({
          variables: {
            userId: Auth.getProfile().data._id,
            cartProductId,
            cartProductName: product.data?.product.name,
            cartProductSizeId,
            cartProductSize: sizeName,
            cartProductImage: product.data?.product.image,
            cartProductPrice: product.data?.product.price,
            cartProductPriceId: sizePriceId,
            cartProductQuantity: 1
          },
          refetchQueries: [
            {
              query: QUERY_ME,
              variables: {
                cartProductId
              }
            }
          ],
        });
        await updateProductInventory({
          variables: {
            productId: cartProductId,
            sizeId: cartProductSizeId,
            cartProductQuantity: 1
          },
          refetchQueries: [
            {
              query: QUERY_SINGLE_PRODUCT,
              variables: {
                productId
              }
            }
          ]
        })
        setSize("");
        showCheckMark();
      } catch(error){
        console.log(error)
      } 
    }
  }
  console.log(loggedInCartItems)
  
  let existingLocalCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  const handleAddToCartLocal = async (event) =>{
    event.preventDefault();
    if(existingLocalCartItems == null) existingLocalCartItems = []

    const cartProductId = productId;
    const cartProductSizeId = sizeId;
    const duplicateCartItem = existingLocalCartItems.find(existingLocalCartItem => existingLocalCartItem.cartProductId === cartProductId && existingLocalCartItem.cartProductSizeId === cartProductSizeId)

    if(duplicateCartItem) {
      try {
        duplicateCartItem.cartProductQuantity += 1
        // await updateProductInventory({
        //   variables: {
        //     cartProductId,
        //     cartProductSizeId,
        //     cartProductQuantity: 1
        //   }
        // })
      } catch (err) {
        console.log(err)
      }
    } else {
      let cartItem = {
        'cartProductId': productId, 
        "cartProductName": product.data?.product.name, 
        "cartProductSizeId": sizeId, 
        "cartProductSize": sizeName, 
        "cartProductImage": product.data?.product.image, 
        "cartProductPrice": product.data?.product.price,
        "cartProductPriceId": sizePriceId,
        "cartProductQuantity": 1
      }
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      existingLocalCartItems.push(cartItem);
      
    }
    localStorage.setItem("allCartItems", JSON.stringify(existingLocalCartItems));
    await updateProductInventory({
      variables: {
        productId,
        sizeId,
        cartProductQuantity: 1
      },
      refetchQueries: [
        {
          query: QUERY_SINGLE_PRODUCT,
          variables: {
            productId
          }
        }
      ],
    })
    dispatch(increment())
    setSize("");
    showCheckMark();
  }

  // if(loading){
  //   return(
  //     <div>
  //       <p>Loading</p>
  //     </div>
  //   )
  // } else 
console.log(inventory, "inventory")

  let productCollectionName 
  for (let i = 0; i < product.data?.product.categories.length; i++) {
    if(product.data?.product.categories[i].isCollection === true) {
      productCollectionName = product.data?.product.categories[i].name
    }
  }
  return (
    <div className="single-product-container">
      <div>
        <Carousel className="product-image" interval={null} variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={product.data?.product.image}
              alt="image1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={product.data?.product.image2}
              alt="image2"
            />
          </Carousel.Item>
        </Carousel>

        <div className="product-price-sm">
          <h3>{product.data?.product.name}</h3>
          <h4>${product.data?.product.price}</h4>
        </div>
        
        <form className="product-btns">
          <div className="size-selector">
            {inventory?.map(stock => (
              <div
                key={stock._id}
                className={`size-box ${sizeName === stock.size ? "selected" : ""} ${stock.quantity === 0 ? "disabled" : ""}`}
                onClick={() => stock.quantity > 0 && handleSizeSelect(stock.size, stock._id, stock.priceId)}
              >
                {stock.size}
              </div>
            ))}
          </div>
          <div className="add-to-cart">
            {Auth.loggedIn() ? (
              <button id="addCartBtn" className= "cart-btn" onClick={handleAddToCart} disabled={size === "" || cartBtnText === "Adding"}>{cartBtnText}</button>
            ):(
              <button id="addCartLocalBtn" className="cart-btn" onClick={handleAddToCartLocal} disabled={size === "" || cartBtnText === "Adding"}>{cartBtnText}</button>
            )}
          </div> 
        </form>
      </div>

      <div className="product-info ms-lg-4">
        <div className="product-price-lg">
          <h3>{product.data?.product.name}</h3>
          <h4>${product.data?.product.price}</h4>
          {productCollectionName ? (
            <h6 className="product-collection-name">{productCollectionName} Collection</h6>
          ) : (
            null
          )}
        </div>
        <div className="product-description mt-5">
          <label>Item Description</label>
          <p>{product.data?.product.description}</p>
        </div>
      </div>  
    </div>
  )
}

export default SingleProduct;