import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Handle the user registration
  const handleUserRegistration = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("/users/register", values);
      setLoading(false);
      if (res.data.success) {
        message.success("User register successfully.");
        navigate("/login");
      } else {
        message.error("Failed while user registration");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Invalid username or password!!");
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
          onFinish={handleUserRegistration}
        >
          <h4 className="text-center">Register Form</h4>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

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
            <Link to="/login">Already register ? click here to login</Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
