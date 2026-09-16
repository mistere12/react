import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Dish from "./Dish";
import Card from "./Card";
import Modal from "./ui/Modal";

function DishList({ dishes, onAdd }) {
  const [selectedDish, setSelectedDish] = useState(null);

  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <>
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

            <button onClick={() => setSelectedDish(dish)}>
              Quick View
            </button>
          </Card>
        ))}
      </div>

      {selectedDish && (
        <Modal onClose={() => setSelectedDish(null)}>
          <h2 id="dish-modal-title">
            {selectedDish.name} {selectedDish.emoji}
          </h2>

          <p>{selectedDish.description}</p>

          <p>
            Category: {selectedDish.category}
          </p>

          <p>
            Price: {(selectedDish.price * 1.15).toFixed(2)} ETB
          </p>

          {selectedDish.spicy && (
            <p>🌶️ Spicy</p>
          )}
        </Modal>
      )}
    </>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default DishList;