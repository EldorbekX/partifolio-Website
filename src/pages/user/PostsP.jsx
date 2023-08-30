import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Spin } from "antd";
import { IMG_URL } from "../../const";
import { NavLink } from "react-router-dom";
const PostsP = () => {
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 10;

  const getTeachers = useCallback(async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://blog-backend-production-a0a8.up.railway.app/api/v1/post?limit=100`
      );
      let categordata = data.data;
      console.log(categordata);
      setTeachers(categordata);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);
  // console.log(teachers);

  const filteredTeachers = teachers.filter(
    (pr) =>
      pr.category &&
      pr.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredTeachers.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  function StudentCategory(id) {
    localStorage.setItem("ID", JSON.stringify(id));
  }

  console.log(IMG_URL);
  return (
    <div>
      <div className="container">
        <Input
          style={{ height: "50px", marginTop: "150px" }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      {loading ? (
        <Spin />
      ) : (
        <section id="slider">
          <div className="container ">
            <div className="slider-paragraph">
              <h2>All posts</h2>
            </div>
            <div className="owl-carousel">
              {currentPosts.map((pr, index) => (
                <div key={index} className="boxs">
                  <NavLink
                    to={`/blogpost`}
                    onClick={() => StudentCategory(pr._id)}
                    className="boxstitle"
                  >
                    <div className="boxcars">
                      <div className="box-left">
                        {pr.photo ? (
                          <img
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
                      </div>
                      <div className="box-right">
                        <h5 className="nameca">{pr.category.name}</h5>
                        <h3 className="nameca">
                          {pr.title} Design tips for designers that cover
                          everything you need
                        </h3>
                        <p className="descriptions nameca">
                          {pr.category.description}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="pagination">
              <div className="pagebutton">
                <Button disabled={currentPage === 1} onClick={prevPage}>
                  Prev
                </Button>
                {Array.from(
                  { length: Math.ceil(filteredTeachers.length / postsPerPage) },
                  (_, i) => (
                    <Button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={currentPage === i + 1 ? "active" : ""}
                    >
                      {i + 1}
                    </Button>
                  )
                )}
                <Button
                  disabled={
                    currentPage ===
                    Math.ceil(filteredTeachers.length / postsPerPage)
                  }
                  onClick={nextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PostsP;
