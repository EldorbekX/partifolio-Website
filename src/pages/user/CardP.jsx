import { Card, Col } from "react-bootstrap";
import Slider from "react-slick";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { Image } from "antd";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../../const";
const CardP = () => {
  const [teachers, setTeachers] = useState([]);
  const getTeachers = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://blog-backend-production-a0a8.up.railway.app/api/v1/post/lastones`
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function StudentCategory(id) {
    localStorage.setItem("ID", JSON.stringify(id));
  }

  return (
    <div id="caruselCard" className="container">
      <h1> Popular blogs </h1>
      <Slider {...settings} id="Cardcha">
        {teachers.map((pr) => (
          <NavLink
            to={`/blogpost`}
            onClick={() => StudentCategory(pr._id)}
            id="carda"
            key={pr}
          >
            <Col className="mb-3 cols">
              <Card id="caruscard" style={{ width: "22rem" }}>
                <Image.PreviewGroup>
                  {pr.photo ? (
                    <Image
                      style={{ height: "300px" }}
                      variant="top"
                      src={`${IMG_URL}${pr.photo._id}.${
                        pr.photo.name.split(".")[1]
                      }`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://picsum.photos/1000/1000";
                      }}
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </Image.PreviewGroup>
                <p style={{ fontSize: "14px" }} className="posted-ol">
                  By <small style={{ color: "blue" }}>{pr.title}</small> |{" "}
                  {format(new Date(pr.createdAt), "MMM d, yyyy")}
                </p>
                <Card.Body>
                  <Card.Title>{pr.title}</Card.Title>
                  <Card.Text className="line-clamp ">
                    {pr.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </NavLink>
        ))}
      </Slider>
    </div>
  );
};

export default CardP;
