"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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
  // Devuelve false si ya se alcanzó el máximo de unidades disponibles.
  addToCart: (product: CartProduct) => boolean;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getQuantity: (productId: number) => number;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "michicare-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  // Leer el carrito guardado en el navegador al cargar la página:
  // localStorage solo existe en el cliente, por eso se hace en un efecto.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsedCart: CartItem[] = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          // Los carritos guardados antes de existir el stock no lo traen: se descartan.
          const validItems = parsedCart
            .filter(
              (item) =>
                typeof item?.product?.stock === "number" && item.quantity > 0,
            )
            .map((item) => ({
              ...item,
              quantity: Math.min(item.quantity, item.product.stock),
            }))
            .filter((item) => item.quantity > 0);

          setItems(validItems);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  function getQuantity(productId: number): number {
    return items.find((item) => item.product.id === productId)?.quantity ?? 0;
  }

  function addToCart(product: CartProduct): boolean {
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