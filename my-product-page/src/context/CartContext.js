import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage on change
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedOption = null) => {
    console.log('Adding product to cart:', product);
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.selectedOption === selectedOption
      );
      if (existingIndex !== -1) {
        // Update quantity if product with same option exists
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        console.log('Updated cart:', updatedCart);
        return updatedCart;
      } else {
        // Add new product to cart
        const newCart = [...prevCart, { ...product, quantity, selectedOption }];
        console.log('New cart:', newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId, selectedOption = null) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item.id === productId && item.selectedOption === selectedOption))
    );
  };

  const updateQuantity = (productId, quantity, selectedOption = null) => {
    if (quantity < 1) return;
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === productId && item.selectedOption === selectedOption) {
          return { ...item, quantity };
        }
        return item;
      });
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
