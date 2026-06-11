import { create } from "zustand";
import type { Product } from "../data/products";

type CartItem = { product: Product; qty: number };

type CartState = {
  items: Record<string, CartItem>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  totalCount: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: {},
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  add: (product, qty = 1) =>
    set((state) => {
      const existing = state.items[product.id];
      return {
        items: {
          ...state.items,
          [product.id]: {
            product,
            qty: (existing?.qty ?? 0) + qty,
          },
        },
      };
    }),
  remove: (id) =>
    set((state) => {
      const next = { ...state.items };
      delete next[id];
      return { items: next };
    }),
  setQty: (id, qty) =>
    set((state) => {
      if (qty <= 0) {
        const next = { ...state.items };
        delete next[id];
        return { items: next };
      }
      return {
        items: { ...state.items, [id]: { ...state.items[id], qty } },
      };
    }),
  totalCount: () =>
    Object.values(get().items).reduce((acc, it) => acc + it.qty, 0),
  totalPrice: () =>
    Object.values(get().items).reduce(
      (acc, it) => acc + it.qty * it.product.price,
      0,
    ),
}));
