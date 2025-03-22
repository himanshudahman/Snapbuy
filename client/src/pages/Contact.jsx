import React from "react";
import Layout from "../component/layout/Layout";
import contactImg from "./../assets/contactus.jpeg";
import { BiMailSend } from "react-icons/bi";
import { BiPhoneCall } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";

export default function Contact() {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src={contactImg} alt="contact image" />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> himanshudahman8930@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> :9991423362
          </p>
          <p className="mt-3">
            <BiSupport /> :+91 9991423362 (toll free);
          </p>
        </div>
      </div>
    </Layout>
  );
}
