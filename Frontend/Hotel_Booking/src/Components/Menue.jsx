import React, { useContext, useState } from 'react'
import {MenueContext} from '../Context/MenueContext'
import { categoryItem } from '../assets/assets'
const Menue = () => {
  const {products}=useContext(MenueContext)
  const [category,setcategory]=useState("All");

  return (
    <div className=' px-4 py-12 mx-w-6xl mx-auto'>
      {/* header */}
      <div className='text-center mb-6'>
        <h1 className='text-4xl font-bold text-white'>Discover Our Menue</h1>
      </div>

      {/* category */}
      <div className='text-center mb-8 flex justify-center gap-8'>
        {categoryItem.map((item,index)=>(
          <li key={index} 
          onClick={()=>setcategory((prev)=>prev === item.category_title ? "All" : item.category_title)}
          className={`cursor-pointer list-none px-10 py-3 rounded-full font-medium text-sm transition-all duration-200 ${
            category === item.category_title ? " bg-amber-500 border-2 border-dashed border-gray-600 " : " border-2 border-dashed border-gray-600"
          }`}>
            {item.category_title}</li>
        ))}
      </div>

      {/* menue Display */}
      <div className='grid grid-cols-2 gap-8'>
        {
          products.length > 0 ? (
            products.filter(
              (product)=>category=== "All" || category === product.category
            ).map((product)=>(
              <>
              <div key={product._id} className='flex items-center gap-6 p-4 border-2 border-dashed border-gray-600 rounded-xl transition hover:shadow-md'>
                <img src={product.image} alt="" className='w-32 h-32 object-cover rounded-full'/>
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                    <span className='text-lg font-semibold text-amber-500 relative ml-4'>
                      <span className="before:content-[''] before:absolute before:w-10 before:border-b before:dotted before:border-gray-400 before:-left-12 before:top-1/2 before:transform before:translate-y-1/2"></span>
                      ${product.price}
                    </span>
                  </div>
                  <p className='text-sm text-gray-500 mt-1 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam natus impedit nostrum omnis aliquid repudiandae sapiente sunt vel fugit sit neque, enim minima reprehenderit. Minima dicta sunt sint impedit amet.</p>
                </div>
              </div>
              </>
            ))
          ) : (
            <p className='text-sm col-span-2 text-gray-500'>Nothing in the menue</p>
          )
        }
      </div>
    </div>
  )
}

export default Menue
