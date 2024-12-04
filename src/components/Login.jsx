import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/tokenSlice";
import { saveUser } from "../../redux/userSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/tokens`,
      method: "POST",
      data: { username, password },
    });
    dispatch(login(response.data.token));
    dispatch(saveUser(response.data.user));
    navigate("/");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  return (
    <div className="background-blue vh-100 d-flex align-items-center">
      <div className="container shadow h-75 contenedor-principal">
        <div className="row shadow h-100">
          <div className="col-2 col-sm-3 col-md-6 col-lg-7 bg-black rounded-start">
            <div className="d-flex flex-column h-100 col-left-login">
              <i className="bi bi-twitter-x fs-2 text-white"></i>
              <p className="fw-bold text-white fs-4 mt-auto paragraph-left-col-login d-none d-md-block">
                Hey! Nice to see you again.
              </p>
            </div>
          </div>
          <div className="col-10 col-sm-9 col-md-6 col-lg-5 bg-light rounded-end">
            <div className="container px-3 text-black h-100 d-flex flex-column justify-content-center">
              <p className="fs-4 mb-0 fw-bold">Login</p>
              <p className="mb-3 mt-0">Ready to start using X?</p>
              <form onSubmit={handleSubmit} action="/login">
                <label hidden htmlFor="username">
                  username
                </label>
                <input
                  onChange={handleUsername}
                  value={username}
                  placeholder="Username"
                  className="form-control mb-3"
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                />

                <label hidden htmlFor="password">
                  password
                </label>
                <input
                  value={password}
                  onChange={handlePassword}
                  placeholder="Password"
                  className="form-control mb-3"
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                />
                <button className="button-tweet-styles rounded-pill mb-3 w-100">Login</button>
                <p className="text-center">
                  Don't have an account?
                  <Link className="text-decoration-none ms-1 color-blue" to="/sign-up">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
