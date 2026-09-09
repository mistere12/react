import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
import NotFound from "./NotFound";

import { CartProvider } from "./cart/CartProvider";
import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>

              <Route index element={<Home />} />

              <Route path="menu" element={<Menu />} />

              <Route
                path="menu/:id"
                element={<DishDetail />}
              />

              <Route path="cart" element={<Cart />} />

              <Route path="login" element={<Login />} />

              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />

              <Route
                path="*"
                element={<NotFound />}
              />

            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
