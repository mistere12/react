import {
  useContext,
  useState
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { AuthContext } from "./auth/AuthContext";

function Login() {
  const [phone, setPhone] = useState("");

  const {
    login,
    loading
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname ?? "/menu";

  async function handleSubmit(e) {
    e.preventDefault();

    await login(phone);

    navigate(from, {
      replace: true
    });
  }

  return (
    <section>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Phone

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="09..."
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Sign In"}
        </button>
      </form>
    </section>
  );
}

export default Login;