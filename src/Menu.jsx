import { useState } from "react";
import menu from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const shown =
    category === "All"
      ? menu
      : menu.filter((dish) => dish.category === category);

  function addToOrder(price) {
    setTotal(total + price);
  }

  return (
    <section>
      <h2>Our Menu</h2>

      <CategoryBar
        selected={category}
        onSelect={setCategory}
      />

      <DishList
        dishes={shown}
        onAdd={addToOrder}
      />

      <h2>Order Total: {total.toFixed(2)} ETB</h2>

      <OrderForm />
    </section>
  );
}

export default Menu;