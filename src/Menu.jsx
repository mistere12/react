import { useEffect, useState} from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
//import { loadDishes } from "./api";
import {useRef } from "react";
import {useContext, useMemo, useCallback} from "react";
import { useFetch } from "./hooks/useFetch";
import { CartContext } from "./cart/CartContext";

function Menu() {
  const [category, setCategory] = useState("All");
  // const [dishes, setDishes] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [total, setTotal] = useState(0);

  const searchRef = useRef(null)

  // useEffect(() => {
  // searchRef.current.focus();
  // }, []);

  const {data, loading, error} = useFetch("/dishes.json");

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
   }, [data, category]);                         //


  // useEffect(() => {
  //   const controller = new AbortController();

  //   async function load() {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const data = await loadDishes(category, controller.signal);
  //       setDishes(data);
  //     } catch (e) {
  //       if (e.name !== "AbortError") {
  //         setError(e.message);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   load();

  //   return () => controller.abort();
  // }, [category]);

  // // function addToOrder(price) {
  // //   setTotal(total + price);
  // // }

  const addToOrder = useCallback((dish) => {
    dispatch({
      type: "add",
      dish
    });
  }, [dispatch]);

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
        onSelect={setCategory}
      />


      <DishList
        dishes={shown}   //
        onAdd={addToOrder}
      />

      <h2>Order Total: {total.toFixed(2)} ETB</h2>

      <OrderForm />
    </section>
  );
}

export default Menu;