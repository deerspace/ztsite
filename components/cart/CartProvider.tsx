"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createCartClient, type StoreCart } from "@/lib/commerce";

interface CartContextValue {
  // null until the first load completes (avoids SSR/localStorage mismatch)
  cart: StoreCart | null;
  ready: boolean;
  busy: boolean;
  miniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<ReturnType<typeof createCartClient> | null>(null);
  const [cart, setCart] = useState<StoreCart | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  const client = () => {
    clientRef.current ??= createCartClient();
    return clientRef.current;
  };

  useEffect(() => {
    let cancelled = false;
    client()
      .getCart()
      .then((c) => {
        if (cancelled) return;
        setCart(c);
        setReady(true);
      })
      .catch((err) => {
        console.error("cart load failed", err);
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const run = useCallback(async (op: () => Promise<StoreCart>) => {
    setBusy(true);
    try {
      setCart(await op());
    } catch (err) {
      console.error("cart operation failed", err);
    } finally {
      setBusy(false);
    }
  }, []);

  const addItem = useCallback(
    async (productId: number, quantity: number) => {
      await run(() => client().addItem(productId, quantity));
      setMiniCartOpen(true);
    },
    [run],
  );

  const updateItem = useCallback(
    (key: string, quantity: number) => run(() => client().updateItem(key, quantity)),
    [run],
  );

  const removeItem = useCallback(
    (key: string) => run(() => client().removeItem(key)),
    [run],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      ready,
      busy,
      miniCartOpen,
      openMiniCart: () => setMiniCartOpen(true),
      closeMiniCart: () => setMiniCartOpen(false),
      addItem,
      updateItem,
      removeItem,
    }),
    [cart, ready, busy, miniCartOpen, addItem, updateItem, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
