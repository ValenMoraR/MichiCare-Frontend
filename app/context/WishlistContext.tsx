
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CartProduct } from "./CartContext";

type WishlistContextType = {
  items: CartProduct[];
  addToWishlist: (product: CartProduct) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const STORAGE_KEY = "michicare-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(STORAGE_KEY);

      if (savedWishlist) {
        const parsedWishlist: CartProduct[] = JSON.parse(savedWishlist);

        if (Array.isArray(parsedWishlist)) {
          setItems(parsedWishlist);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  function addToWishlist(product: CartProduct) {
    setItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  }

  function removeFromWishlist(productId: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  function isInWishlist(productId: number) {
    return items.some((item) => item.id === productId);
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist debe utilizarse dentro de WishlistProvider"
    );
  }

  return context;
}
