import Navbar from "../Components/Navbar"
import line from '../assets/Images/line2.png'
import bgImage from '../assets/Images/hero.jpg'
import img1 from '../assets/Images/breakfast.jpg'
import img2 from '../assets/Images/serv2.jpg'
import img3 from '../assets/Images/serv3.jpg'
import { useFood, type FoodItem } from "../Context/FoodContext"
import Footer from "../Components/Footer"
import { useState } from "react"
import Cartsidebar from "../Components/Cartsidebar"


const Home = ({ onLogout }: { onLogout: () => void }) => {
  const { foodData, loading, error,addToCart } = useFood();
  const [activeCategory, setactiveCategory] = useState<string>("All");
  const [isCartOpen,setisCartOpen]=useState(false);

  if (loading) return <div className="text-center py-20 text-2xl">Loading Delicious Food...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  const filterFood = activeCategory === "All" ? foodData : foodData.filter((food: FoodItem) => food.category.toLowerCase() == activeCategory.toLowerCase());
  const categories = ["All", "Drinks", "Pizza", "Chicken", "Rice", "Noodles"];

  return (
    <>
    <Cartsidebar isOpen={isCartOpen} onClose={() => setisCartOpen(false)}/>
      <div className='relative h-screen w-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
        <Navbar onLogout={onLogout} onCartClick={()=>setisCartOpen(true)} />
        <div className='relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 -mt-10'>
          <img src={line} alt="" />
          <h2 className='text-lg md:text-xl mb-4 -tracking-widest uppercase'>Where Delight Meets Taste</h2>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>Demi's Dinner</h1>
          <button className='bg-amber-500 text-black py-3 px-10 hover:bg-amber-600 transition'>Order Now</button>
        </div>
      </div>

      {/* services */}

      <div>
        <div className='flex bg3'>
          {/* first service */}
          <div className='w-1/3'>
            <div className='p-16'>
              <img src={line} alt="" className=' -mb-2 w-45 place-self-center' />
              <h2 className='text-amber-300 text-center text-4xl'>Breakfast</h2>
              <p className='text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias consequuntur eos, ipsum ex sunt fuga atque dolore impedit deserunt, dignissimos odit nobis expedita magni et dolorum amet corporis ab.</p>
            </div>
            <div>
              <img src={img1} alt="" className='h-160' />
            </div>
          </div>
          {/* second service */}
          <div className='w-1/3'>
            <div className=''>
              <img src={img3} alt="" className='h-160 w-full' />
            </div>
            <div className='p-16'>
              <img src={line} alt="" className=' -mb-2 w-45 place-self-center' />
              <h2 className='text-amber-300 text-center text-4xl'>Drinks</h2>
              <p className='text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias consequuntur eos, ipsum ex sunt fuga atque dolore impedit deserunt, dignissimos odit nobis expedita magni et dolorum amet corporis ab.</p>
            </div>

          </div>
          {/* third service */}

          <div className='w-1/3'>
            <div className='p-16'>
              <img src={line} alt="" className=' -mb-2 w-45 place-self-center' />
              <h2 className='text-amber-300 text-center text-4xl'>Appertizers</h2>
              <p className='text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias consequuntur eos, ipsum ex sunt fuga atque dolore impedit deserunt, dignissimos odit nobis expedita magni et dolorum amet corporis ab.</p>
            </div>
            <div>
              <img src={img2} alt="" className='h-160' />
            </div>
          </div>

        </div>
      </div>

      {/* menue */}

      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center py-2">
          <span className="text-3xl font-semibold">Discover our's Menue</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 md:px-28">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setactiveCategory(cat)}
              className={`border-dashed border-2 p-2 px-6 rounded-full cursor-pointer transition-all ${activeCategory === cat
                ? "bg-amber-500 border-amber-500 text-white"
                : "border-gray-300 hover:border-amber-400"
                }`}
            >
              <span className="font-semibold text-sm">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Food Details */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-28 py-10">
        {filterFood.map((food: FoodItem) => (
          <div key={food.id} className="group overflow-hidden rounded-xl shadow-lg border">
            <div className="relative h-64 w-full overflow-hidden ">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button 
                onClick={() => {
    addToCart(food.id); 
    setisCartOpen(true); 
  }}
                className="bg-amber-500 text-white font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-600 shadow-xl cursor-pointer">
                  Buy Now
                </button>
              </div>
              <div className="absolute top-4 right-4 bg-amber-500 text-black font-bold px-3 py-1 rounded-full">
                ${food.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{food.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{food.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* footer */}

      <Footer />

    </>

  )
}

export default Home
