import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./auth/AuthContext";
import { CartContext } from "./cart/CartContext";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole"
  });

  const phoneRef = useRef(null);

  const { user } = useContext(AuthContext);
  const { items, total, dispatch } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    phoneRef.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert(`Order for ${form.name} submitted!`);

    dispatch({
      type: "clear"
    });

    navigate("/menu", {
      replace: true
    });
  }

  const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  if (items.length === 0) {
    return (
      <section>
        <h2>Checkout</h2>

        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Checkout</h2>

      <p>
        Signed in as: {user.phone}
      </p>

      <p>
        Order Total: {total.toFixed(2)} ETB
      </p>

      <form onSubmit={handleSubmit}>
        <h2>Delivery Information</h2>

        <label>
          Name

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <label>
          Phone

          <input
            ref={phoneRef}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="09... or +2519..."
          />
        </label>

        {form.phone && !validPhone && (
          <p className="err">
            Use 09... or +2519...
          </p>
        )}

        <label>
          Area

          <select
            name="area"
            value={form.area}
            onChange={handleChange}
          >
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Piassa">Piassa</option>
            <option value="CMC">CMC</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={!validPhone}
        >
          Pay with TeleBirr
        </button>
      </form>
    </section>
  );
}

export default Checkout;