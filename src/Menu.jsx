import menu from "./data";
import Dish from "./Dish";
import Card from "./Card";

function Menu() {
  const selectedCategory = "Main";

  const filteredMenu = menu.filter(
    (dish) => dish.category === selectedCategory
  );

  if (filteredMenu.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <section>
      <h2>{selectedCategory} Dishes</h2>

      <div className="menu">
        {filteredMenu.map((dish) => (
          <Card key={dish.id}>
            <Dish
              name={dish.name}
              price={dish.price}
              description={dish.description}
              category={dish.category}
              emoji={dish.emoji}
              spicy={dish.spicy}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Menu;