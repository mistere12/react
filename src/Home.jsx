import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <h2>Welcome to Addis Eats</h2>

      <p>
        Enjoy traditional Ethiopian dishes delivered
        around Addis Ababa.
      </p>

      <p>
        <strong>Today's Special:</strong> Kitfo
      </p>

      <Link to="/menu">
        View Our Menu
      </Link>
    </section>
  );
}

export default Home;