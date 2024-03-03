import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  // Handle the user registration
  const handleUserRegistration = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="register">
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
