import { useContext } from "react";
import predicted from "../assets/Images/predictive-chart.png";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authProvider";

const Header = () => {
  const { isloggedin, setisloggedin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setisloggedin(false);
    navigate("/login");
  };

  return (
    <nav
      className="navbar-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "linear-gradient(90deg, white)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <img
            src={predicted}
            alt="Predictive Chart"
            style={{ height: "55px", marginRight: "12px" }}
          />
        </Link>
        <h1
          style={{
            color: "blueviolet",
            fontWeight: "bold",
            fontSize: "24px",
            margin: 0,
          }}
        >
          Stock Prediction Portal
        </h1>
      </div>

      <div>
        {isloggedin ? (
          <>
            <Button text="Dashboard" class="btn-dark rounded" url="/Dashboard" />
            &nbsp;
            <button onClick={handleLogout} className="btn-danger rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Button text="Login" class="btn-dark rounded" url="/login" />
            &nbsp;
            <Button text="Register" class="btn-dark rounded" url="/register" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
