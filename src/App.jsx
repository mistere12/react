import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Cart from "./Cart";
//import Checkout from "./Checkout";
import Login from "./Login";
import NotFound from "./NotFound";


import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";

const Checkout = lazy(() => import("./Checkout"));

function App() {
  return (
    
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Layout />}>

              <Route index element={<Home />} />

              <Route path="menu" element={
                <ErrorBoundary
                  fallback={<p>Menu is currently unavailable.</p>}
                >
                 <Menu />
                </ErrorBoundary>
              } />

              <Route
                path="menu/:id"
                element={<DishDetail />}
              />

              <Route path="cart" element={
                <ErrorBoundary
                  fallback={<p>Cart is currently unavailable.</p>}
                >
                 <Cart />
              </ErrorBoundary>} />

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
        </Suspense>
        </AuthProvider>
      </BrowserRouter>
    
  );
}

export default App;
