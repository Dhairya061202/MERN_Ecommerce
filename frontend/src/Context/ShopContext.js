import React, { createContext, useEffect, useState } from "react";
import all_product from '../Components/Assests/all_product'
import Product from "../Pages/Product";
import { baseUrl } from "../urls";



export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index]=0
        
    }
    return cart
}

const ShopContextProvider = (props)=>{

    // const[all_product,setAll_product]=useState([])

    const [cartItem,setCartItem] = useState(getDefaultCart())

    // useEffect(()=>{
    //     fetch(`${baseUrl}/allproducts`).then((res)=>res.json()).then((data)=>setAll_product(data))
    // },[])

    const addToCart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch(`${baseUrl}/addtocart`,{
                method: 'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    "itemId":itemId
                }),
            }).then((res)=>res.json()).then((data)=>console.log(data))
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItem[item] 
            }
        }
        return totalAmount
    }

    const getTotalCartItems = () =>{
        let totalItems=0
        for(const item in cartItem)
        {
            if(cartItem[item]>0){
                totalItems += cartItem[item]
            }
        }
        return totalItems
    }

    const contextValue = {all_product,cartItem,addToCart,removeFromCart, getTotalCartAmount,getTotalCartItems};


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;