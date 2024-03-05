import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from "antd";

const Header = () => {
  const navigate = useNavigate();
  // get the user Details
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  // logout user
  const handleUserLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    message.success("Logout successful");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Expense Management
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-content-center">
              <li className="nav-item p-2">{loginUser && loginUser.name}</li>

              <button className="btn btn-primary" onClick={handleUserLogout}>
                Logout
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
