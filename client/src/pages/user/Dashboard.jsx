import React from "react";
import Layout from "../../component/layout/Layout";
import UserMenu from "../../component/layout/UserMenu";
import { useAuth } from "../../context/auth";

export default function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout title={"DashBoard -All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
