import React, { createContext, useContext, useEffect, useState } from "react";
import { applyBookDiscount, hasBookPrice } from "../utils/pricing";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("dar_al_khair_cart");
      return saved
        ? JSON.parse(saved).map((item) => ({
            ...item,
            book: applyBookDiscount(item.book),
          }))
        : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
    visible: false,
  });

  useEffect(() => {
    try {
      localStorage.setItem("dar_al_khair_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const addToCart = (book, quantity = 1) => {
    const discountedBook = applyBookDiscount(book);
    if (!hasBookPrice(discountedBook)) {
      showToast("لا يمكن إضافة الكتاب إلى السلة قبل تحديد سعره.", "error");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === discountedBook.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === discountedBook.id
            ? {
                ...item,
                book:
                  discountedBook.discountPercent >
                  (Number(item.book.discountPercent) || 0)
                    ? discountedBook
                    : item.book,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }
      return [...prev, { book: discountedBook, quantity }];
    });
    showToast(`Added "${discountedBook.title}" to cart`, "success");
  };

  const removeFromCart = (bookId) => {
    const item = cart.find((i) => i.book.id === bookId);
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
    if (item) {
      showToast(`Removed "${item.book.title}" from cart`, "info");
    }
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast("Shopping cart cleared", "info");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      (hasBookPrice(item.book) ? Number(item.book.price) * item.quantity : 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        toast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
