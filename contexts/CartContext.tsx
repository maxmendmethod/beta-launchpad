"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
  Cart,
  createCart,
  addCartLines,
  updateCartLine,
  removeCartLine,
  fetchCart,
  getProductFirstVariant,
} from "@/lib/shopify";

interface AddToCartOptions {
  productGid: string;
  sellingPlanId?: string;
  quantity?: number;
}

interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (options: AddToCartOptions) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_ID_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      fetchCart(cartId).then((c) => {
        if (c) setCart(c);
        else localStorage.removeItem(CART_ID_KEY);
      });
    }
  }, []);

  const addToCart = useCallback(async ({ productGid, sellingPlanId, quantity = 1 }: AddToCartOptions) => {
    setIsLoading(true);
    try {
      const variantId = await getProductFirstVariant(productGid);
      const line = {
        merchandiseId: variantId,
        quantity,
        ...(sellingPlanId ? { sellingPlanId } : {}),
      };
      const cartId = localStorage.getItem(CART_ID_KEY);
      let updated: Cart;
      if (cartId) {
        updated = await addCartLines(cartId, [line]);
      } else {
        updated = await createCart([line]);
        localStorage.setItem(CART_ID_KEY, updated.id);
      }
      setCart(updated);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    setIsLoading(true);
    try {
      setCart(await updateCartLine(cartId, lineId, quantity));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    setIsLoading(true);
    try {
      setCart(await removeCartLine(cartId, lineId));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
