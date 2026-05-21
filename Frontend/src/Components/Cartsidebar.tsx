import { FaTimes } from 'react-icons/fa';
import { useFood } from '../Context/FoodContext';

const Cartsidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, totalAmount, checkout } = useFood();

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-amber-500/20 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-amber-500">Your Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {cart.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Your cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <img 
                  src={item.food_item.image} 
                  alt={item.food_item.name} 
                  className="w-16 h-16 object-cover rounded-lg" 
                />
                <div className="flex-1">
                  <h4 className="font-bold text-white">{item.food_item.name}</h4>
                  <p className="text-amber-500 text-sm">${item.food_item.price} x {item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span className="text-white">Total:</span>
              <span className="text-amber-500">${totalAmount.toFixed(2)}</span>
            </div>
            <button 
              onClick={checkout}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-amber-500/20"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cartsidebar;