"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../src/features/auth/hooks/useAuth";

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

// Cada usuario tiene su propia lista guardada en este navegador.
const storageKey = (userId: number) => `michicare-wishlist:${userId}`;

export function WishlistProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id ?? null;

  const [items, setItems] = useState<CartProduct[]>([]);
  // Id del usuario cuya lista ya se leyó: evita mezclar listas entre usuarios.
  const [loadedUserId, setLoadedUserId] = useState<number | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  // Al iniciar sesión se carga la lista de ese usuario; al cerrarla, se
  // oculta (pero sigue guardada para cuando vuelva a entrar).
  useEffect(() => {
    if (authLoading) return;

    if (userId === null) {
      setItems([]);
      setLoadedUserId(null);
      return;
    }

    let loaded: CartProduct[] = [];

    try {
      const saved = localStorage.getItem(storageKey(userId));

      if (saved) {
        const parsed: CartProduct[] = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          loaded = parsed;
        }
      }
    } catch {
      localStorage.removeItem(storageKey(userId));
    }

    setItems(loaded);
    setLoadedUserId(userId);
  }, [authLoading, userId]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Guardar los cambios en la lista del usuario actual.
  useEffect(() => {
    if (userId !== null && loadedUserId === userId) {
      localStorage.setItem(storageKey(userId), JSON.stringify(items));
    }
  }, [items, userId, loadedUserId]);

  function addToWishlist(product: CartProduct) {
    // Todavía se está comprobando la sesión: se ignora el clic.
    if (authLoading) return;

    // Para guardar favoritos hay que iniciar sesión.
    if (!user) {
      router.push("/login");
      return;
    }

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