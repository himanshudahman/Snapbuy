import React from "react";
import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <div className="text-center">
      <h4 className="mb-3">dashboard</h4>
      <ul className="list-group">
        <li>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
