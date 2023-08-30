import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CardP from "./CardP";
import Albom from "./Albom";
import { format } from "date-fns";
import { IMG_URL } from "../../const";
import { NavLink } from "react-router-dom";

const HomeP = () => {
  const [teachers, setTeachers] = useState([]);

  const getTeachers = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://blog-backend-production-a0a8.up.railway.app/api/v1/post/lastone`
      );
      console.log(data);
      setTeachers(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  function StudentCategory(id) {
    localStorage.setItem("ID", JSON.stringify(id));
  }

  return (
    <div>
      {teachers._id ? (
        <section>
          {teachers.photo ? (
            <img
              id="image"
              style={{ width: "100%" }}
              src={`${IMG_URL}${teachers.photo._id}.${
                teachers.photo.name.split(".")[1]
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/1000/1000";
              }}
            />
          ) : (
            <div>No Image Available</div>
          )}

          <div className=" bagraund">
            <div className="container">
              <div className="titles">
                <p className="posted-on">
                  Posted on {teachers.category && teachers.category.name}
                </p>
                <h1 style={{ color: "white" }} className="post-title">
                  {teachers.title}
                </h1>
                <p className="posted-os">
                  {format(
                    new Date(teachers.user && teachers.user.createdAt),
                    "MMM d, yyyy"
                  )}
                </p>
                <p className="post-description">
                  {teachers.description}{" "}
                  {teachers.category && teachers.category.description}
                </p>
                <NavLink
                  to={`/blogpost`}
                  onClick={() => StudentCategory(teachers._id)}
                >
                  <button className="btns">Read More</button>
                </NavLink>
              </div>
            </div>
          </div>

          <CardP />
          <br />
          <br />
          <div className="container">
            <hr />
          </div>
          <br />
          <br />
          <br />
          <Albom />
        </section>
      ) : (
        <div className="loader">..loding</div>
      )}
    </div>
  );
};

export default HomeP;
