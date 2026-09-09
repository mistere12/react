import { useMemo, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";

const initialState = {
  items: []
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  const total = state.items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total
    }),
    [state.items, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}