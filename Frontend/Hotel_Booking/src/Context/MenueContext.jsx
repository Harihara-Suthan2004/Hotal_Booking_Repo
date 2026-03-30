
import {  createContext, useState } from 'react';
import {product} from '../assets/assets';

export const MenueContext=createContext()

const MenueContextProvider=({children})=>{
    const [products,setproducts]=useState(product)
    return(
        <MenueContext.Provider value={{products}}>{children}</MenueContext.Provider>
    )
}

export default MenueContextProvider