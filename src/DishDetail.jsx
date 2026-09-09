import {
  Link,
  useParams
} from "react-router-dom";

import { useFetch } from "./hooks/useFetch";

function DishDetail() {
  const { id } = useParams();

  const {
    data,
    loading,
    error
  } = useFetch("/dishes.json");

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p className="err">{error}</p>;
  }

  const dishes = data ?? [];

  const dish = dishes.find(
    (item) => item.id === Number(id)
  );

  if (!dish) {
    return (
      <section>
        <h2>Dish Not Found</h2>

        <p>
          No dish with ID {id} exists.
        </p>

        <Link to="/menu">
          Back to Menu
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2>
        {dish.name} {dish.emoji}
      </h2>

      <p>{dish.description}</p>

      <p>
        Category: {dish.category}
      </p>

      {dish.spicy && (
        <p className="spicy">
          🌶️ Spicy
        </p>
      )}

      <p className="price">
        {(dish.price * 1.15).toFixed(2)} ETB
      </p>

      <Link to="/menu">
        Back to Menu
      </Link>
    </section>
  );
}

export default DishDetail;