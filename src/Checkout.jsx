import { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useCartStore } from "./cart/cartStore";

import { validate } from "./validate";

import Field from "./Field";

import { placeOrder } from "./api/orders";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: ""
  });

  const [touched, setTouched] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [serverError, setServerError] = useState("");

  const phoneRef = useRef(null);

  const items = useCartStore(
    (state) => state.items
  );

  const total = useCartStore(
    (state) =>
      state.items.reduce(
        (sum, dish) => sum + dish.price,
        0
      )
  );

  const clear = useCartStore(
    (state) => state.clear
  );

  const navigate = useNavigate();

  useEffect(() => {
    phoneRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  function handleBlur(fieldName) {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [fieldName]: true
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitted(true);
    setServerError("");

    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      const firstError =
        Object.keys(validationErrors)[0];

      setTouched((currentTouched) => ({
        ...currentTouched,
        ...Object.keys(validationErrors).reduce(
          (result, field) => ({
            ...result,
            [field]: true
          }),
          {}
        )
      }));

      document
        .getElementById(firstError)
        ?.focus();

      return;
    }

    setSubmitting(true);

    try {
      const order = await placeOrder(form);

      alert(
        `Order for ${order.name} submitted!`
      );

      clear();

      navigate("/menu", {
        replace: true
      });
    } catch (error) {
      if (
        error.status === 422 &&
        error.fieldErrors
      ) {
        setServerError(
          "Please correct the highlighted fields."
        );

        setTouched((currentTouched) => ({
          ...currentTouched,
          ...Object.keys(
            error.fieldErrors
          ).reduce(
            (result, field) => ({
              ...result,
              [field]: true
            }),
            {}
          )
        }));

        const firstError =
          Object.keys(error.fieldErrors)[0];

        document
          .getElementById(firstError)
          ?.focus();
      } else {
        setServerError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  const errors = validate(form);

  const showNameError =
    touched.name && errors.name;

  const showPhoneError =
    touched.phone && errors.phone;

  const showAreaError =
    touched.area && errors.area;

  const showNotesError =
    touched.notes && errors.notes;

  if (items.length === 0) {
    return (
      <section>
        <h2>Checkout</h2>

        <p>Your cart is empty.</p>

        <Link to="/menu">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Checkout</h2>

      <p>
        Order Total: {total.toFixed(2)} ETB
      </p>

      {submitted &&
        Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="summary"
          >
            <p>
              Please fix{" "}
              {Object.keys(errors).length}{" "}
              field(s).
            </p>
          </div>
        )}

      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Delivery Information</h2>

        <Field
          label="Name"
          id="name"
          error={showNameError}
        >
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={() =>
              handleBlur("name")
            }
            placeholder="Your name"
            aria-invalid={!!showNameError}
            aria-describedby={
              showNameError
                ? "name-error"
                : undefined
            }
          />
        </Field>

        <Field
          label="TeleBirr number"
          id="phone"
          error={showPhoneError}
        >
          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={() =>
              handleBlur("phone")
            }
            placeholder="09... or +2519..."
            aria-invalid={!!showPhoneError}
            aria-describedby={
              showPhoneError
                ? "phone-error"
                : undefined
            }
          />
        </Field>

        <Field
          label="Delivery area"
          id="area"
          error={showAreaError}
        >
          <select
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={() =>
              handleBlur("area")
            }
            aria-invalid={!!showAreaError}
            aria-describedby={
              showAreaError
                ? "area-error"
                : undefined
            }
          >
            <option value="Bole">
              Bole
            </option>

            <option value="Kazanchis">
              Kazanchis
            </option>

            <option value="Megenagna">
              Megenagna
            </option>

            <option value="Piassa">
              Piassa
            </option>
          </select>
        </Field>

        <Field
          label="Notes"
          id="notes"
          error={showNotesError}
        >
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={() =>
              handleBlur("notes")
            }
            placeholder="Delivery instructions (optional)"
            maxLength={200}
            aria-invalid={!!showNotesError}
            aria-describedby={
              showNotesError
                ? "notes-error"
                : undefined
            }
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Sending your order..."
            : `Pay with TeleBirr — ${total.toFixed(
                2
              )} ETB`}
        </button>

        {serverError && (
          <p
            className="err"
            role="alert"
          >
            {serverError}
          </p>
        )}
      </form>
    </section>
  );
}

export default Checkout;