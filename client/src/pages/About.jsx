import React from "react";
import Layout from "../component/layout/Layout";
import about from "../assets/about.jpeg";

export default function About() {
  return (
    <Layout title={"About SanpBuy"}>
      <div className="row contactus py-4">
        <div className="col-md-6 align-items-center">
          <img
            src={about}
            alt="About Us"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark text-white text-center p-3 rounded">
            About Us
          </h1>
          <p className="mt-3">
            Welcome to our e-commerce store! We offer high-quality products with
            seamless shopping experiences. Customer satisfaction is our
            priority.
          </p>
        </div>
      </div>
    </Layout>
  );
}
