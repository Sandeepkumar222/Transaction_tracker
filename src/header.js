import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("dates");
    localStorage.removeItem("Calories");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <ul className="mr-auto navbar-nav">
              <li className="nav-item">
                {" "}
                <Link className="navbar-brand" to="/home">
                  <img
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
                    width="45"
                    height="35"
                    className="align-top d-inline-block"
                  />{" "}
                  Transactions Tracker
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/expenses">
                  Transactions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/userStats">
                  User Stats
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutme">
                  About me
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="btn btn-info btn-sm glyphicon glyphicon-log-out"
                  href="/login" onClick= {removeToken}
                >
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
