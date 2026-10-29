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

export type CartProduct = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  stock: number;
};

export type CartItem = {
  product: CartProduct;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  // Devuelve false si no hay sesión o si ya se alcanzó el máximo de unidades.
  addToCart: (product: CartProduct) => boolean;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getQuantity: (productId: number) => number;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cada usuario tiene su propio carrito guardado en este navegador.
const storageKey = (userId: number) => `michicare-cart:${userId}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id ?? null;

  const [items, setItems] = useState<CartItem[]>([]);
  // Id del usuario cuyo carrito ya se leyó: evita guardar el carrito de uno en el de otro.
  const [loadedUserId, setLoadedUserId] = useState<number | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  // Al iniciar sesión se carga el carrito de ese usuario; al cerrarla, se
  // oculta (pero sigue guardado para cuando vuelva a entrar).
  useEffect(() => {
    if (authLoading) return;

    if (userId === null) {
      setItems([]);
      setLoadedUserId(null);
      return;
    }

    let loaded: CartItem[] = [];

    try {
      const saved = localStorage.getItem(storageKey(userId));

      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          loaded = parsed
            .filter(
              (item) =>
                typeof item?.product?.stock === "number" && item.quantity > 0,
            )
            .map((item) => ({
              ...item,
              quantity: Math.min(item.quantity, item.product.stock),
            }))
            .filter((item) => item.quantity > 0);
        }
      }
    } catch {
      localStorage.removeItem(storageKey(userId));
    }

    setItems(loaded);
    setLoadedUserId(userId);
  }, [authLoading, userId]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Guardar los cambios en el carrito del usuario actual.
  useEffect(() => {
    if (userId !== null && loadedUserId === userId) {
      localStorage.setItem(storageKey(userId), JSON.stringify(items));
    }
  }, [items, userId, loadedUserId]);

  function getQuantity(productId: number): number {
    return items.find((item) => item.product.id === productId)?.quantity ?? 0;
  }

  function addToCart(product: CartProduct): boolean {
    // Todavía se está comprobando la sesión: se ignora el clic.
    if (authLoading) return false;

    // Para usar el carrito hay que iniciar sesión.
    if (!user) {
      router.push("/login");
      return false;
    }

    // No se puede pasar de las unidades disponibles.
    if (getQuantity(product.id) >= product.stock) {
      return false;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, product, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });

    return true;
  }

  function removeFromCart(productId: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }

  function updateQuantity(productId: number, quantity: number) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              // Mínimo 1 y máximo el stock disponible.
              quantity: Math.min(Math.max(1, quantity), item.product.stock),
            }
          : item,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.product.precio * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider");
  }

  return context;
}