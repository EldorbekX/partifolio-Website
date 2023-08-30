import { useContext, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button } from "antd";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
function Header() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [loadings, setLoadings] = useState([]);
  let { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // const enterLoading = (index) => {
  //   setLoadings((prevLoadings) => {
  //     const newLoadings = [...prevLoadings];
  //     newLoadings[index] = true;
  //     return newLoadings;
  //   });
  //   setTimeout(() => {
  //     setLoadings((prevLoadings) => {
  //       const newLoadings = [...prevLoadings];
  //       newLoadings[index] = false;
  //       return newLoadings;
  //     });

  //     if (index === 1) {
  //       if (isAuthenticated) {
  //         navigate("/account");
  //       } else {
  //         navigate("/login");
  //       }
  //     }
  //   }, 1000);
  // };

  const enterLoading = async (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    

    try {
      if (index === 1) {
        if (isAuthenticated) {
          // Simulate a loading delay (optional)
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate("/account");
        } else {
          // Simulate a loading delay (optional)
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate("/login");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }
  };

  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };
  const logOutsayt = () => {
    // Remove the token cookie and update the authentication state to false
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/login"); // Redirect the user to the login page after logout
  };

  return (
    <>
      <Navbar expand="md" className=" mb-3" id="navbarCol">
        <Container className="container" fluid>
          <Link
            to={isAuthenticated ? "/my-posts" : "/"}
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "28px",
              textDecoration: "none",
            }}
          >
            {isAuthenticated ? "{ My blogs" : "{ Najot News "}
          </Link>
          <Navbar.Toggle style={{ backgroundColor: "white" }} />
          <Navbar.Offcanvas id="offCanvas" placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title style={{ color: "white" }}>
                Najot News
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className=" linknavs d-flex justify-content-end flex-grow-1 pe-3">
                <Link id="linknav" to="/" style={{ color: "white" }}>
                  Home
                </Link>
                <Link id="linknav" to={"/posts"} style={{ color: "white" }}>
                  Blogs
                </Link>
                <Link id="linknav" to={"/about"} style={{ color: "white" }}>
                  About Us
                </Link>
                <Link id="linknav" to={"/register"} style={{ color: "white" }}>
                  Register
                </Link>
              </Nav>
              <Button
                style={{ height: "46px", width: "100px", fontWeight: "bold" }}
                loading={loadings[1]}
                onClick={() => enterLoading(1)}
                variant="outline-success"
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={isAuthenticated ? "/account" : "/login"}
                >
                  {" "}
                  {isAuthenticated ? "Account" : "Login"}
                </Link>
              </Button>
              <NavLink className={`app ${darkMode ? "dark" : ""}`}>
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                  className="btn-dark"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <DarkModeIcon style={{ color: "white" }} />
                  ) : (
                    <WbSunnyIcon style={{ color: "#ef7c00" }} />
                  )}
                </button>
              </NavLink>
              <button
                style={{ backgroundColor: "transparent", border: "none" }}
                onClick={logOutsayt}
              >
                <LogoutIcon
                  sx={{ fontSize: "30px", color: "white", fontWeight: "bold" }}
                />
              </button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
