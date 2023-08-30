import { NavLink } from "react-bootstrap";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
const Footer = () => {
  return (
    <div className="footers">
      <footer className="container ">
        <div className="row align-items-center">
          <div className="col-10 title">
            <a href="#">Finstreet 118 2561 Fintown</a>
            <p>Hello@finsweet.com 020 7993 2905</p>
          </div>
          <div className="col d-flex  justify-content-between">
            <NavLink href="#">
              <FacebookOutlined
                style={{ fontSize: "20px", color: "#6D6E76" }}
              />
            </NavLink>
            <NavLink href="#">
              <InstagramOutlined style={{ fontSize: "20px", color: "#6D6E76" }}/>
            </NavLink>
            <NavLink href="#">
              <TwitterOutlined style={{ fontSize: "20px", color: "#6D6E76" }}/>
            </NavLink>
            <NavLink href="#">
              <LinkedinOutlined style={{ fontSize: "20px", color: "#6D6E76" }}/>
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
