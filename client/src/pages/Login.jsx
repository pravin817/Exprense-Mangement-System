import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle the user registration
  const handleUserLogin = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const res = await axios.post("/users/login", values);
      setLoading(false);
      if (res.data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.user, password: "" })
        );
        message.success("User login successfully");
        navigate("/");
      } else {
        message.error("User Login Failed");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Something went wrong");
    }
  };

  //   Prevent the user registration if it is already login
  
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register">
        {loading && <Spinner />}
        <Form
          layout="vertical"
          className="register-form"
          onFinish={handleUserLogin}
        >
          <h4 className="text-center">Login Form</h4>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password type="password" placeholder="Enter your password" />
          </Form.Item>

          {/* The button section  */}
          <div className="d-flex justify-content-between">
            <Link to="/register">New user ? click here to Register</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
