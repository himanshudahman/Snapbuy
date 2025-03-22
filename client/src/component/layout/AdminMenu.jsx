import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div className="text-center">
      <h4 className="mb-3">Admin Panel</h4>
      <ul className="list-group">
        <li>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/create-products"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
