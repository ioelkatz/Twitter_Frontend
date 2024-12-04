import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/userSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [archives, setArchives] = useState("");

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastname = (e) => {
    setLastname(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleArchives = (e) => {
    setArchives(e.target.value);
  };

  const addUser = async (e) => {
    e.preventDefault();
    const call = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/users`,
      data: { firstname, lastname, username, email, password, archives },
    });
    dispatch(saveUser(call.data.newUser));
    navigate("/login");
  };
  return (
    <>
      <div className="d-flex vh-100 align-items-center">
        <div className="container shadow h-75 signup-container">
          <div className="row shadow h-100">
            <div className="col-2 col-sm-3 col-md-6 col-lg-7 bg-black rounded-start">
              <div className=" d-flex flex-column h-100 col-left-signup">
                <i className="bi bi-twitter-x fs-2 text-white"></i>
                <p className="fw-bold text-white fs-4 mt-auto paragraph-left-sign-up d-none d-md-block">
                  Hi! Welcome to X Clone.
                </p>
              </div>
            </div>
            <div className="col-10 col-sm-9 col-md-6 col-lg-5 bg-light rounded-end">
              <div className="container px-3 py-4 text-black h-100 d-flex flex-column justify-content-center">
                <p className="fs-4 fw-bold m-0">Sign Up</p>
                <p className="m-0 mb-4">Create an account and start using X</p>
                <form onSubmit={addUser}>
                  <label hidden htmlFor="firstName">
                    Firstname
                  </label>
                  <input
                    onChange={handleFirstname}
                    value={firstname}
                    placeholder="First name"
                    className="form-control mb-3"
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                  <label hidden htmlFor="LastName">
                    lastName
                  </label>
                  <input
                    onChange={handleLastname}
                    value={lastname}
                    placeholder="Last name"
                    className="form-control mb-3"
                    type="text"
                    id="lastName"
                    name="lastName"
                  />
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
                  />
                  <label hidden htmlFor="email">
                    email
                  </label>
                  <input
                    onChange={handleEmail}
                    value={email}
                    placeholder="Email"
                    className="form-control mb-3"
                    type="email"
                    id="email"
                    name="email"
                  />
                  <label hidden htmlFor="password">
                    password
                  </label>
                  <input
                    onChange={handlePassword}
                    value={password}
                    placeholder="Password"
                    className="form-control mb-3"
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="password"
                  />

                  <label hidden htmlFor="archives">
                    Archives
                  </label>
                  <input
                    onChange={handleArchives}
                    value={archives}
                    placeholder="hola"
                    className="form-control mb-3"
                    type="file"
                    id="archives"
                    name="archives"
                  />

                  <button className="btn btn-primary fw-bold w-100 mb-3 rounded-5">
                    Sign Up
                  </button>
                  <p className="text-center">
                    Already have an account?
                    <Link className="text-decoration-none ms-1" to="/login">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
