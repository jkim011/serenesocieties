import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from "react";
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import {ADD_TO_CART} from "../../utils/mutations"
import Auth from "../../utils/auth";
import "../../styles/singleProduct.css"

function SingleProduct() {
  const { productId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productId }
  });
  const navigate = useNavigate()
  
 
  const product = data?.product || {};
  const inventory = product.inventory
 

  const sizeDataName = data?.product.inventory[0].size
  const sizeDataId = data?.product.inventory[0]._id
  const sizeData = [sizeDataName, sizeDataId]
  const useStateData = sizeData.toString()

// console.log(sizeDataName,"console.log")
// console.log(sizeDataId,"console.log")
  const [size, setSize] = useState("--")
  // const [sizeId, setSizeId] = useState("")

  

  const handleSizeSelect = (event) => {
    const {name, value} = event.target;
    if(name === "Size"){
      setSize(value)  
    }
  }
  const sizeFields = size.split(',')
  const sizeName = sizeFields[0]
  const sizeId = sizeFields[1]
  // console.log(sizeName, "sizeName")
  // console.log(sizeId, "sizeId")
  // console.log(size, "size")
  // console.log(productId, "ProductID")
  // console.log(product)
  console.log("*************************")
  // console.log("userID", Auth.getProfile().data._id)
  console.log("CartProductId", productId)
  console.log("product name", product.name)
  console.log("image", product.image)
  console.log("price", product.price)
  console.log("sizeId", sizeId, )
  console.log("sizeName", sizeName, )
  console.log("__________________________________________")

  // const sizeIdValue = document.querySelector(".sizeId")
  // console.log(sizeIdValue)

  const [addCartItem, {error}] = useMutation(ADD_TO_CART)

  const handleAddToCart = async (event) => {
    event.preventDefault();



    try{
      const {cartData} = await addCartItem({
        variables:
        {
          userId: Auth.getProfile().data._id,
          cartProductId: productId,
          cartProductName: product.name,
          cartProductSizeId: sizeId,
          cartProductSize: sizeName,
          cartProductImage: product.image,
          cartProductPrice: product.price,
        },
      });
      navigate(0)
    } catch(err){
      console.log(err)
    }
  }

  const handleAddToCartLocal = async (event) =>{
    event.preventDefault();
    console.log("local clik")

    const localCartItems = []

    localCartItems.push({'cartProductId': productId, "cartProductName": product.name, "cartProductSizeId": sizeId, "cartProductSize": sizeName, "cartProductImage": product.image, "cartProductPrice": product.price  })

    

      // localStorage.setItem('cartProductId', productId)
      // localStorage.setItem("cartProductName", product.name)
      // localStorage.setItem("cartProductSizeId", sizeId)
      // localStorage.setItem("cartProductSize", sizeName)
      // localStorage.setItem("cartProductImage", product.image)
      // localStorage.setItem("cartProductPrice", product.price)
      console.log(localCartItems, "LOCAL CART")
  }


 
console.log("SIZE", size)

const blankOption = document.querySelector("#blankOption")
const addCartBtn = document.querySelector("#addCartBtn")





  if(loading){
    return(
    <div>
      <p>Loading</p>
    </div>)
  }else 
  return (
    <div className="single-product-container">
      <Carousel className="product-image" interval={null} variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={product.image}
            alt="image1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={product.image2}
            alt="image2"
          />
        </Carousel.Item>
      </Carousel>

      <div className="product-info">
        <h3>{product.name} <span style={{marginLeft:"30px"}}>${product.price}</span></h3>
        <ul className="product-description">
          <li>{product.description}</li>
          <li>Desc </li>
          <li>Desc </li>
          <li>Desc </li>
        </ul>

        <form className="product-btns">
            <label>Size: </label>
            <select id="product-size" className="product-size"  name="Size"  value={size}  onChange={handleSizeSelect} >
            <option id="blankOption">--</option> 
              {inventory?.map(stock =><option className="sizeId" value={[stock.size, stock._id]} key={stock._id}>{stock.size}</option>)}
            </select>
          <div>
          {Auth.loggedIn() ? (
            <button id="addCartBtn" className="btns cart-btn " onClick={handleAddToCart} disabled={size === "--"}>Add to cart</button>
          
          ):(
            <button id="addCartBtn" className="btns cart-btn " onClick={handleAddToCartLocal} disabled={size === "--"}>Add to cart</button>
          )}
          </div>
          
        </form>
      </div>
      
    </div>
  )

 

 
 
}

export default SingleProduct;