import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  // Handle the user registration
  const handleUserLogin = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="register">
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
