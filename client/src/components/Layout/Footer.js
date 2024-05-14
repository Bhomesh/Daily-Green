import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
    <div className="footer" style={{ position: "relative", bottom: 0, width: "100%", backgroundColor: "#f5f5f5", textAlign: "center",margin:0, padding: "10px 0 ", minHeight: "10%" }}>
      <h6 className="text-center">All Right Reserved &copy; DailyGreens</h6>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
    </>
  );
};

export default Footer;
