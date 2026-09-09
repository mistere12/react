import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cart/CartContext";

function Cart() {
  const { items, dispatch, total } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <section>
        <h2>Your Cart</h2>

        <p>Your cart is empty.</p>

        <Link to="/menu">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Your Cart</h2>

      {items.map((dish, index) => (
        <article key={`${dish.id}-${index}`}>
          <h3>
            {dish.name} {dish.emoji}
          </h3>

          <p>
            {dish.price.toFixed(2)} ETB
          </p>

          <button
            onClick={() =>
              dispatch({
                type: "remove",
                id: dish.id
              })
            }
          >
            Remove
          </button>
        </article>
      ))}

      <h2>
        Total: {total.toFixed(2)} ETB
      </h2>

      <button
        onClick={() =>
          dispatch({
            type: "clear"
          })
        }
      >
        Clear Cart
      </button>

      <br />
      <br />

      <Link to="/checkout">
        Go to Checkout
      </Link>
    </section>
  );
}

export default Cart;