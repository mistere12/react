import { useCartStore } from "./cart/cartStore";

function CartBadge() {
  const itemCount = useCartStore((state) => state.items.length);

  return <span>Cart items: {itemCount}</span>;
}

export default CartBadge;