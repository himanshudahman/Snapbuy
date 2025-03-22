import React from "react";
import Layout from "../../component/layout/Layout";
import UserMenu from "../../component/layout/UserMenu";

export default function Orders() {
  return (
    <Layout>
      <div className="container-fluid p-3 m-3"></div>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9 ">
          <h1>All Orders</h1>
        </div>
      </div>
    </Layout>
  );
}
