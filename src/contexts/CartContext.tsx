import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  _id: string; // product ID
  cartItemId: string; // Unique composite key: `${_id}_${selectedSize}_${selectedColor}`
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  sizes?: string[];
  colors?: string[];
  category?: string;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: {
    _id?: string;
    id?: string;
    name: string;
    image: string;
    price: number;
    quantity?: number;
    selectedSize?: string;
    selectedColor?: string;
    sizes?: string[];
    colors?: string[];
    category?: string;
  }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

const CART_STORAGE_KEY = "angel_paradise_cart_v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (item: {
    _id?: string;
    id?: string;
    name: string;
    image: string;
    price: number;
    quantity?: number;
    selectedSize?: string;
    selectedColor?: string;
    sizes?: string[];
    colors?: string[];
    category?: string;
  }) => {
    const productId = item._id || item.id || String(Date.now());
    const size = item.selectedSize || (item.sizes && item.sizes.length > 0 ? item.sizes[0] : "");
    const color = item.selectedColor || (item.colors && item.colors.length > 0 ? item.colors[0] : "");
    const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    const compositeKey = `${productId}_${size}_${color}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.cartItemId === compositeKey || (!i.cartItemId && i._id === productId)
      );

      if (existingIndex > -1) {
        return prev.map((i, idx) =>
          idx === existingIndex
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      const newItem: CartItem = {
        _id: productId,
        cartItemId: compositeKey,
        name: item.name,
        image: item.image,
        price: Number(item.price),
        quantity: qty,
        selectedSize: size,
        selectedColor: color,
        sizes: item.sizes,
        colors: item.colors,
        category: item.category,
      };

      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (identifier: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== identifier && i._id !== identifier));
  };

  const updateQuantity = (identifier: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(identifier);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.cartItemId === identifier || i._id === identifier
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setCart([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
