import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "on" : ""
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/menu"
        className={({ isActive }) =>
          isActive ? "on" : ""
        }
      >
        Menu
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "on" : ""
        }
      >
        Cart
      </NavLink>

      <NavLink
        to="/checkout"
        className={({ isActive }) =>
          isActive ? "on" : ""
        }
      >
        Checkout
      </NavLink>
    </nav>
  );
}

export default Nav;