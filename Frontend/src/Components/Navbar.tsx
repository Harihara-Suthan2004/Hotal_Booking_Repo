import { FaShoppingCart } from "react-icons/fa"

const Navbar = ({onLogout,onCartClick}:{onLogout:()=>void;onCartClick:()=>void}) => {
  return (
    <div className='sticky z-10 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm'>
      <div className='flex justify-between p-8 text-white'>
        <div>
          <h2 className='font-bold text-2xl'>MasterChef</h2>
        </div>
        <div className="">
          <ul className='flex justify-between gap-8'>
            <li className='font-bold text-lg cursor-pointer'>Home</li>
            <li className='font-bold text-lg cursor-pointer'>Menue</li>
            <li className='font-bold text-lg cursor-pointer'>Contact</li>
            <li className='font-bold text-2xl text-center text-amber-500 border-white' onClick={onCartClick}><FaShoppingCart/></li>
            <button 
              onClick={onLogout}
              className="bg-amber-500 hover:bg-amber-600 cursor-pointer rounded-md px-4 py-1 active:scale-95 transition-all"
            >
              <span className="text-lg text-white font-bold">Log Out</span>
            </button>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
