import { Fragment, useCallback, useEffect, useState } from "react";
import "./BlogPost.css";
import axios from "axios";
import { IMG_URL } from "../../../const";
import { format } from "date-fns";

const BlogPost = () => {
  const albumId = JSON.parse(localStorage.getItem("ID"));

  const [data, setData] = useState({});

  const getData = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://blog-backend-production-a0a8.up.railway.app/api/v1/post/${albumId}`
      );
      setData(data);
      console.log(data);
    } catch (err) {
      // console.log(err.response.massage);
    }
  }, [albumId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {data._id ? (
        <Fragment>
          <section>
            <div className="container">
              <div className="div-row">
                {data.photo ? (
                  <>
                    <img
                      className="img4"
                      style={{
                        height: "550px",
                        width: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                        marginTop: "110px",
                      }}
                      src={`${IMG_URL}${data.photo._id}.${
                        data.photo.name.split(".")[1]
                      }`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://picsum.photos/1000/1000";
                      }}
                    />
                    <br />
                    <br />
                    <div className="comentswherw d-flex">
                      <div className="cratcoment">
                        <img
                          src="https://img.freepik.com/free-photo/serious-thoughtful-man-squinting-skeptical-thinking-as-making-choice_176420-19022.jpg?w=2000"
                          alt=""
                        />
                      </div>
                      <div className="cratcomenttitle">
                        <h3>{data.user && data.user.first_name}</h3>
                        <p>
                          {" "}
                          {format(
                            new Date(data.user && data.user.createdAt),
                            "MMM d, yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>No Image Available</div>
                )}
                <div className="comentswherw">
                  <h1 className=" datatitle">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit, molestiae!
                  </h1>
                  <p>
                    {data.title} {data.description}{" "}
                    {data.category && data.category.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      ) : (
        <div className="loader">..loding</div>
      )}
    </>
  );
};

export default BlogPost;
