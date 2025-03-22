import React from "react";
import { Link } from "react-router-dom";

export default function Fotter() {
  return (
    <div className="footer">
      <h4>All Right Reserved &copy;SnapBuy</h4>
      <p className="text-center mt-3">
        <Link to="/about">About </Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy </Link>
      </p>
    </div>
  );
}
