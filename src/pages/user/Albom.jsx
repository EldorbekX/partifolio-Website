import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCounter } from "./useHook";

const Albom = () => {
  const [teachers, setTeachers] = useState([]);
  const { setCategoryName } = useCounter()
  const getTeachers = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://blog-backend-production-a0a8.up.railway.app/api/v1/category`
      );
      let categordata = data.data;
      const arr = categordata.map((pr) => ({
        value: pr._id,
        label: pr.name,
      }));
      setCategoryName(arr);
      console.log(categordata);
      setTeachers(categordata);
    } catch (err) {
      console.log(err);
    }
  }, [setCategoryName]);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  function StudentCategory(id) {
    localStorage.setItem("ID", JSON.stringify(id));
  }

  return (
    <div>
      <div className="container ">
        <div className="text-center">
          <h1> Choose A Catagory </h1>
        </div>
        <div className="gradient-cards">
          {teachers.slice(0, 4).map((pr, index, _id) => (
            <NavLink
              to={`/posts/${_id}`}
              onClick={() => StudentCategory(pr._id)}
              key={index}
              className="cardk"
            >
              <div className="container-card bg-green-box">
                <div className="Icons">
                  <RocketLaunchIcon
                    style={{ fontSize: "30px", color: "#232536" }}
                  />
                </div>
                <p className="card-title">{pr.name}</p>
                <p className="card-description">{pr.description}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Albom;
