import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole"
  });

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
  }

  const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  return (
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

      <button type="submit" disabled={!validPhone}>
        Pay with TeleBirr
      </button>
    </form>
  );
}

export default OrderForm;