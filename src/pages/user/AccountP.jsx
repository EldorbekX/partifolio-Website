import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import { request } from "../../server/request";
const AccountP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  const getUserData = useCallback(() => {
    request("auth/me")
      .then(({ data }) => {
        form.setFieldsValue(data); // Set the user data in the form fields
      })
      .catch((err) => {
        console.log(err);
      });
  }, [form]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const handleChange = (changedValues, allValues) => {
    console.log("Changed values:", changedValues);
    console.log("All values:", allValues);
    form.setFieldsValue(changedValues);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await request.put("auth/details", values);
      message.success("Edited successfully!");
      console.log(values);
      getUserData(); // Refresh the user data after successful update
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(setIsAuthenticated);
  console.log(navigate);
  console.log(setErrorMessage);
  return (
    <section>
      <div className="RegisterFlex">
        <section className="loginpage">
          <h1>Account</h1>
          {loading ? (
            <LoadingOutlined
              style={{
                fontSize: "50px",
                color: "blue",
                fontWeight: "bold",
              }}
            />
          ) : (
            <Form
              form={form}
              onFinish={handleSubmit}
              onValuesChange={handleChange}
            >
              <Form.Item
                name="first_name"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="Firstname" />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input placeholder="Lastname" />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input placeholder="Password" type="password" />
              </Form.Item>
              <Form.Item>
                <Button className="button" type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </Form>
          )}
        </section>
      </div>
    </section>
  );
};

export default AccountP;
