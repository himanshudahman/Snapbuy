import React from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "../../component/layout/AdminMenu";

export default function Users() {
  return (
    <Layout title={"DashBoard all-Users"}>
      <div className="conatiner-fluid mp-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
