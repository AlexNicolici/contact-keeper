import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

function Navbar({ title, icon }) {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}!</li>
      <li>
        <Link onClick={onLogout} to="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <Link to="/" style={{ padding: 0 }}>
        <h1>
          <i className={icon} style={{ marginRight: 5 }} />
          {title}
        </h1>
      </Link>

      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
