// const restaurantName = "Addis Cafe";
import { useContext } from "react";
import { CartContext } from "./cart/CartContext";

function Header(){
    const{items}= useContext(CartContext);
    return(
        <header>
            <h1>Addis Eats</h1>
            <p>Fresh Ethiopian Food & Coffee</p>

            <p>Cart: {items.length}</p>
        </header>
    );
}
export default Header;