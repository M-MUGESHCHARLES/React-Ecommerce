import React, { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product"


export const ShopContext= createContext(null);



const ShopContextProvider=(props)=>{
    
    const[ products , setProducts ] = useState(all_product);
    
    
    // const fetchInfo = async () => {
    //     await fetch("http://localhost:4000/allproducts")
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setProducts(data);
    //     });
    // };
    
    // useEffect(() => {
    //     fetchInfo();
    // }, []);
    
    const getDefaultCart=()=>{
        let cart={};
        for (let index = 0; index < products.length+1; index++) {
            cart[index]=0;
            
        }
        return cart;
    }
    
    const [cartItems,setCartItems]=useState(getDefaultCart());
    
    const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }
    
    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = products.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems =()=>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
    
        }
        return totalItem;
    }

    const contextValue={getTotalCartItems,getTotalCartAmount,products,cartItems,addToCart,removeFromCart};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;