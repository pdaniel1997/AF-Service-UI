import PropTypes from "prop-types";
import React from "react";
import logo from "../pages/resources/avg.jpg"; // Adjust the path if necessary

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#243746`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1080,
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <a
          href="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </a>
      </h1>
      <div>
        <img style={{ height: 80, marginBottom: 0 }} src={logo} alt="Logo" />
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
