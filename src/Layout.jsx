import Header from "./Header";
import Nav from "./Nav";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />

      <Nav />

      <main>
        <Outlet />
        <p id="location">📍Bole, Addis Ababa</p>
      </main>

      <Footer />
    </>
  );
}

export default Layout;