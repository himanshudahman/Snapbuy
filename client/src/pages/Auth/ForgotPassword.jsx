import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout title="Forgot Password">
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="email"
                  placeholder="Enter your email"
                />
              </div>

              {/* Security Question */}
              <div className="mb-3">
                <label htmlFor="answer" className="form-label">
                  Security Answer (Your favorite sport)
                </label>
                <input
                  type="text"
                  value={answer}
                  className="form-control"
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  id="answer"
                  placeholder="Enter your favorite sport name"
                />
              </div>

              {/* New Password Field */}
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  id="newPassword"
                  placeholder="Enter your new password"
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
