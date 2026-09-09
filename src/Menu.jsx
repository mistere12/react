import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "react";

import { useSearchParams } from "react-router-dom";

import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
//import OrderForm from "./OrderForm";

import { useFetch } from "./hooks/useFetch";
import { CartContext } from "./cart/CartContext";

function Menu() {
  const [params, setParams] = useSearchParams();

  const category = params.get("category") ?? "All";

  const searchRef = useRef(null);

  const {
    data,
    loading,
    error
  } = useFetch("/dishes.json");

  const { dispatch, total } = useContext(CartContext);

  useEffect(() => {
    if (!loading && searchRef.current) {
      searchRef.current.focus();
    }
  }, [loading]);

  const shown = useMemo(() => {
    const dishes = data ?? [];

    if (category === "All") {
      return dishes;
    }

    return dishes.filter(
      (dish) => dish.category === category
    );
  }, [data, category]);

  const chooseCategory = useCallback(
    (newCategory) => {
      if (newCategory === "All") {
        setParams({});
      } else {
        setParams({
          category: newCategory
        });
      }
    },
    [setParams]
  );

  const addToOrder = useCallback(
    (dish) => {
      dispatch({
        type: "add",
        dish
      });
    },
    [dispatch]
  );

  if (loading) {
    return <p>Loading the menu...</p>;
  }

  if (error) {
    return <p className="err">{error}</p>;
  }

  return (
    <section>
      <h2>Our Menu</h2>

      <input
        ref={searchRef}
        type="text"
        placeholder="Search dishes..."
      />

      <CategoryBar
        selected={category}
        onSelect={chooseCategory}
      />

      <DishList
        dishes={shown}
        onAdd={addToOrder}
      />

      <h2>
        Order Total: {total.toFixed(2)} ETB
      </h2>

      {/* <OrderForm /> */}
    </section>
  );
}

export default Menu;