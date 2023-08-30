import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table, Select } from "antd";
import { request } from "../../server/request";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { IMG_URL } from "../../const";
// import { NavLink } from "react-router-dom";
const { TextArea } = Input;

const provinceData = [
  { value: "63de2fc268d03b5daea7c6a6", label: " Business" },
  { value: "63de6eb268d03b5daea7dbca", label: "Startup" },
  { value: "63deced968d03b5daea7ec6c", label: "Economy" },
  { value: "63decf1468d03b5daea7ec6f", label: "Technology" },
];

const MyPostsP = () => {
  const [form] = Form.useForm();
  const [mypost, setMypost] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [tags, setTags] = useState(["man", "fashion"]);
  const [uplodImg, setUplodImg] = useState();
  const [selected, setSelected] = useState(null);

  const getPost = useCallback(async () => {
    try {
      let { data } = await request.get("post/user");
      console.log(data);
      setMypost(data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const handleChangeImg = async (e) => {
    try {
      const form = new FormData();
      form.append("file", e.target.files[0]);
      let data = await request.post("upload", form);
      setUplodImg(data?.data?._id);
    } catch (err) {
      console.log(err);
    }
  };

  const showModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  // const submit = async () => {
  //   try {
  //     let values = await form.validateFields();
  //     values.tags = ["man", "fashion"];
  //     values.photo = uplodImg;
  //     console.log(values);
  //     if (selectedPost) {
  //       await request.put(`post/${selected}`, values);
  //     } else {
  //       await request.post("post", values);
  //     }
  //     form.resetFields();
  //     hideModal();
  //     getPost();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const submit = async () => {
    try {
      let values = await form.validateFields();
      values.tags = ["man", "fashion"];
      values.photo = uplodImg;
      console.log(values);
      if (selected) {
        // Use "selected" instead of "selectedPost"
        await request.put(`post/${selected}`, values);
      } else {
        await request.post("post", values);
      }
      form.resetFields();
      hideModal();
      getPost();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  async function editTeacher(id) {
    let { data } = await request.get(`post/${id}`);
    console.log(data);
    form.setFieldsValue(data);
    setSelected(id);
    showModal();
  }

  const addTeacher = () => {
    showModal();
    setSelected(null);
  };

  function deleteTeacher(id) {
    Modal.confirm({
      title: "Do you Want to delete this post?",
      onOk: async () => {
        try {
          await request.delete(`post/${id}`);
          getPost();
        } catch (err) {
          console.log(err);
        }
      },
    });
  }
  function StudentCategory(id) {
    localStorage.setItem("ID", JSON.stringify(id));
  }

  console.log(mypost);
  console.log(uplodImg);
  return (
    <>
      <Table
        id="vata"
        title={() => (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                marginTop: "100px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 className="h3 text-center" id="pageHeaderTitles">
                  My Posts
                </h2>
                <Button
                  style={{ height: "60px" }}
                  onClick={addTeacher}
                  type="primary"
                >
                  Add post
                </Button>
              </div>
            </div>
            <section>
              <section className="dark">
                <div className="container py-4">
                  <h1
                    style={{ marginTop: "100px" }}
                    className="h1 text-center"
                    id="pageHeaderTitle"
                  >
                    My Posts
                  </h1>
                  {mypost.map((pr, index) => (
                    <div
                      onClick={() => StudentCategory(pr._id)}
                      key={index}
                      className="postcard dark blue"
                    >
                      <a className="postcard__img_link" href="#">
                        {pr.photo ? (
                          <img
                            id="mypostimg"
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
                      </a>
                      <div className="postcard__text">
                        <h1 className="postcard__title blue">
                          <p>{pr.title}</p>
                        </h1>
                        <div className="postcard__subtitle small">
                          <time>
                            <CalendarMonthIcon style={{ marginRight: "5px" }} />
                            {format(new Date(pr.createdAt), "MMM d, yyyy")}
                          </time>
                        </div>
                        <div className="postcard__bar"></div>
                        <div className="postcard__preview-txt">
                          {pr.description}
                        </div>
                        <div className="postcard__tagbox">
                          <Button
                            onClick={() => editTeacher(pr._id)}
                            className="tag__item"
                          >
                            <EditOutlined
                              style={{
                                fontSize: "26px",
                                color: "green",
                                gap: "15px",
                              }}
                            />
                          </Button>
                          <Button
                            onClick={() => deleteTeacher(pr._id)}
                            className="tag__item"
                          >
                            <DeleteOutlined
                              style={{ fontSize: "26px", color: "red" }}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </div>
        )}
      />
      <Modal
        open={isModalOpen}
        okText={selectedPost ? "Save" : "Add"}
        onCancel={hideModal}
        onOk={submit}
        title="Adding post"
      >
        <input type="file" onChange={handleChangeImg} />
        <Form
          initialValues={{
            title: selectedPost ? selectedPost.title : "",
            category: selectedPost
              ? selectedPost.category._id
              : provinceData[0], // Set a default value from provinceData
            photo: {
              url: selectedPost ? selectedPost.photo : "",
              name: selectedPost ? selectedPost.name : "",
            },
            tavsif: selectedPost ? selectedPost.description : "",
          }}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
            name="title"
            label="Title"
          >
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Teglar">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Teglar kiriting"
              onChange={(tagValues) => setTags(tagValues)}
              value={tags}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
            name="description"
            label="Description"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
            name="category"
            label="Category"
          >
            <Select>
              {provinceData.map((province) => (
                <Select.Option key={province.value} value={province.value}>
                  {province.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyPostsP;
