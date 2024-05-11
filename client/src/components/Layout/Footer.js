import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h2 className="text-center">ALL Right Reserved &copy; Yahia Store </h2>
      <p className="text-center mt-3">
        <Link to="/about">About Us</Link>|<Link to="/contact">Contact Us</Link>|
        <Link to="/policy">Terme Policy</Link>
      </p>
    </div>
  );
};
export default Footer;
