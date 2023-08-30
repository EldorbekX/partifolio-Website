import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoadingOutlined } from "@ant-design/icons";

// import { request } from "../../server/request";
import axios from "axios";
const RegisterP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const [user, setUser] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      setLoading(true);
      await axios.post(
        `
        https://blog-backend-production-a0a8.up.railway.app/api/v1/auth/register`,
        user
      );

      setIsAuthenticated(true);

      navigate("/login");
    } catch (err) {
      setErrorMessage("Please enter your information in detail and correctly.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <div className="RegisterFlex">
        <section className="loginpage">
          <h1>Register</h1>
          {loading ? (
            <LoadingOutlined
              style={{
                fontSize: "50px",
                color: "blue",
                fontWeight: "bold",
              }}
            />
          ) : (
            <form onSubmit={submit}>
              <input
                type="text"
                onChange={handleChange}
                value={user.first_name}
                placeholder="Firstname"
                name="first_name"
                style={{
                  borderColor: errorMessage ? "red" : "initial", // Change border color to red if there's an error
                }}
              />
              <input
                type="text"
                onChange={handleChange}
                value={user.last_name}
                placeholder="Lastname"
                name="last_name"
                style={{
                  borderColor: errorMessage ? "red" : "initial", // Change border color to red if there's an error
                }}
              />{" "}
              <input
                type="text"
                onChange={handleChange}
                value={user.username}
                placeholder="Username"
                name="username"
                style={{
                  borderColor: errorMessage ? "red" : "initial", // Change border color to red if there's an error
                }}
              />
              <input
                type="text"
                onChange={handleChange}
                value={user.password}
                placeholder="Password"
                name="password"
                style={{
                  borderColor: errorMessage ? "red" : "initial", // Change border color to red if there's an error
                }}
              />
              <button className="button" type="submit">
                Register
              </button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            </form>
          )}
        </section>
      </div>
    </section>
  );
};

export default RegisterP;
