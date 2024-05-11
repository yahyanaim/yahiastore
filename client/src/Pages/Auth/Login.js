import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login= () => {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("/api/v1/auth/login", {
            email,
            password,
          });
          if (res) {
            toast.success(res.data);
            setAuth({
              ...auth,
                user: res.data.user,
                token: res.data.token, 
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log("error");
          toast.error("Register failed");
        }
      };

  return (
    <Layout title={"Register Page"}>
    <div className="form-container" style={{ minHeight: "78.1vh" }}> 
      <form onSubmit={handleSubmit}>
      <h4>Login Form</h4>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Email
          </label>
          <input
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter your email"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
        <button type="button" className="btn btn-primary"
          onClick={() => {navigate('/forgot-password')}}>
          Forget Password
        </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      </div>
  </Layout>
  )
}

export default Login