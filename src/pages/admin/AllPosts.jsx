import { Card, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Image, Input } from "antd";

const  AllPosts = () => {
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const getTeachers = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://blog-backend-production-a0a8.up.railway.app/api/v1/post/lastones`,
        { params: { name: search } }
      );
      // console.log(data);
      setTeachers(data);
    } catch (err) {
      console.log(err);
    }
  }, [search]);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  return (
    <div id="caruselCard" className="container">
      <Input onChange={(e) => setSearch(e.target.value)} value={search} />
      {teachers.map((pr) => (
        <div id="carda" key={pr}>
          <Col className="mb-3 cols">
            <Card style={{ width: "22rem" }}>
              <Image.PreviewGroup>
                <Image
                  variant="top"
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </Image.PreviewGroup>
              <p className="posted-ol">{pr.createdAt}</p>
              <Card.Body>
                <Card.Title>{pr.title}</Card.Title>
                <Card.Text className="line-clamp ">{pr.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </div>
      ))}
    </div>
  );
};


export default AllPosts;
