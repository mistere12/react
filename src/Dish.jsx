import PropTypes from "prop-types";

function Dish({ name, price, description, category, emoji, spicy, currency = "ETB" }) {
  return (
    <article className={`menu-item ${category.toLowerCase()}`}>
      <h3>
        {name} {emoji}
      </h3>

      <p>{description}</p>

      <p className={`category ${category.toLowerCase()}`}>
        {category}
      </p>

      {spicy && <p className="spicy">🌶️ Spicy</p>}

      <p className="price">
        {(price * 1.15).toFixed(2)} {currency}
      </p>
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string
};

export default Dish;