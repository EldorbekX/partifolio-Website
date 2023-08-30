// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { request } from "../../server/request";
// import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";
// import { AuthContext } from "../../context/AuthContext";
// import { LoadingOutlined } from "@ant-design/icons";
// import { Button, } from "antd";
// const LoginP = () => {
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);
//   const [user, setUser] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };
//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       let {
//         data: { token, expire, role },
//       } = await request.post("auth/login", user);
//       setIsAuthenticated(true);
//       if (role === "admin") {
//         navigate("/dashboard");
//       } else if (role === "user") {
//         navigate("/my-posts");
//       }
//       Cookies.set(TOKEN, token);
//       Cookies.set(ROLE, role);
//       Cookies.set(EXPIRE_DATE, expire);
//     } catch (err) {
//       // console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="lodinFlex">
//       <section className="loginpage">
//         {loading ? (
//           <LoadingOutlined
//             style={{ fontSize: "50px", color: "blue", fontWeight: "bold" }}
//           />
//         ) : (
//           <form onSubmit={submit}>
//             <input
//               type="text"
//               onChange={handleChange}
//               value={user.username}
//               placeholder="username"
//               name="username"
//             />

//             <input
//               type="text"
//               onChange={handleChange}
//               value={user.password}
//               placeholder="password"
//               name="password"
//             />
//             <Button
//               loading={loading}
//               htmlType="submit"
//               className="button"
//               type="submit"
//             >
//               Login
//             </Button>
//           </form>
//         )}
//       </section>
//     </div>
//   );
// };

// export default LoginP;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { request } from "../../server/request";
import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";
import { AuthContext } from "../../context/AuthContext";
import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";

const LoginP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let {
        data: { token, expire, role },
      } = await request.post("auth/login", user);
      setIsAuthenticated(true);
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/my-posts");
      }
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);
      Cookies.set(EXPIRE_DATE, expire);
    } catch (err) {
      setErrorMessage("Please enter your information in detail and correctly."); // Set error message if there's an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lodinFlex">
      <section className="loginpage">
        {loading ? (
          <LoadingOutlined
            style={{ fontSize: "50px", color: "blue", fontWeight: "bold" }}
          />
        ) : (
          <form onSubmit={submit}>
            <input
              type="text"
              onChange={handleChange}
              value={user.username}
              placeholder="username"
              name="username"
              style={{
                borderColor: errorMessage ? "red" : "initial", // Change border color to red if there's an error
              }}
            />
            <input
              type="text"
              onChange={handleChange}
              value={user.password}
              placeholder="password"
              name="password"
              style={{
                borderColor: errorMessage ? "red" : "initial", // Change border color to red if there's an error
              }}
            />
            <Button
              loading={loading}
              htmlType="submit"
              className="button"
              type="submit"
            >
              Login
            </Button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        )}
      </section>
    </div>
  );
};

export default LoginP;

