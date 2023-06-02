import React from "react";
import shirt from "../assets/clothes/testShirt.png"
import "../styles/productList.css"

const ProductList = ({products}) => {

    return(

        <div id="productCardContainer" className="d-flex flex-row flex-wrap justify-content-around">

            {products && 
              products.map((product) => (
                <div key={product._id} id="productCard" className="m-2">

                    <div id="productHead">
                        <img id="productImg" src={shirt} alt=""></img>
                    </div>

                    <div className="container ">
                    <div id="productDetails" className="row">
                        <h3 className="col text-center">{product.name}</h3>
                        <h3 className="col text-center">{product.price}</h3>
                        </div>
                    </div>

                </div>

            ))}

            
            {/* <article id="productCard" className="m-2">

                <div id="productHead">
                    <img id="productImg" src={shirt}></img>
                </div>

                <div className="container ">
                <div id="productDetails" className="row">
                    <h3 className="col text-center">Sunset</h3>
                    <h3 className="col text-center">20.00</h3>
                    </div>
                </div>

            </article>

            <article id="productCard" className="m-2">

                <div id="productHead">
                    <img id="productImg" src={shirt}></img>
                </div>

                <div className="container ">
                <div id="productDetails" className="row">
                    <h3 className="col text-center">Sunset</h3>
                    <h3 className="col text-center">20.00</h3>
                    </div>
                </div>

                </article>

            <article id="productCard" className="m-2">

                <div id="productHead">
                    <img id="productImg" src={shirt}></img>
                </div>

                <div className="container ">
                <div id="productDetails" className="row">
                    <h3 className="col text-center">Sunset</h3>
                    <h3 className="col text-center">20.00</h3>
                    </div>
                </div>

            </article> */}
        
        </div>
    )

}

export default ProductList;