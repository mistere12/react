import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Dish from "./Dish";
import Card from "./Card";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="menu">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            description={dish.description}
            category={dish.category}
            emoji={dish.emoji}
            spicy={dish.spicy}
            onAdd={() => onAdd(dish)}
          />

          <Link to={`/menu/${dish.id}`}>
            View Details
          </Link>
        </Card>
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default DishList;