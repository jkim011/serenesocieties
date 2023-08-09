import React from "react";
import { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

const CartList = () => {
    const {loading, data, error} = useQuery(QUERY_ME);
    const cartItems = data?.me.cartItems || []

    console.log(cartItems, "cartItems")
}

export default CartList;