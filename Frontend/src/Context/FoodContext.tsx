import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available: boolean;
}

export interface CartItem {
  id: number;
  quantity: number;
  food_item: {
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

interface FoodContextType {
  foodData: FoodItem[];
  cart: CartItem[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
  addToCart: (foodId: number) => Promise<void>;
  fetchMyCart: () => Promise<void>;
  checkout: () => Promise<void>;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:3000/api"; // Adjust to your server URL

  // Fetch Menu
  const fetchFood = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`);
      const result = await res.json();
      if (result.success) setFoodData(result.food);
    } catch (err) {
      setError("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Cart from Database
  const fetchMyCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/cart/myCart`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      setCart(result.data || []);
      setTotalAmount(result.totalAmount || 0);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  // Add to Cart (Backend Sync)
  const addToCart = async (foodId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ food_item_id: foodId })
      });
      if (res.ok) await fetchMyCart();
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  // Checkout (Clear Cart and Create Order)
  const checkout = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/cart/checkout`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setCart([]);
        setTotalAmount(0);
        alert("Order placed successfully!");
      }
    } catch (err) {
      alert("Checkout failed");
    }
  };

  useEffect(() => {
    fetchFood();
    fetchMyCart();
  }, []);

  return (
    <FoodContext.Provider value={{ 
      foodData, cart, totalAmount, loading, error, addToCart, fetchMyCart, checkout 
    }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) throw new Error('useFood must be used within FoodProvider');
  return context;
};