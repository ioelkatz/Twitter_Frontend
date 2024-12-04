import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTweets, addRestLikes, createTweet } from "../../redux/tweetSlice";
import { logout } from "../../redux/tokenSlice";

function Home() {
  const [modal, setModal] = useState(false);
  const [newTweet, setNewTweet] = useState("");

  const token = useSelector((state) => state.token);
  const tweets = useSelector((state) => state.tweet);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };
  useEffect(() => {
    const tweets = async () => {
      const call = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/tweets/index`,
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch(getTweets(call.data));
    };
    tweets();
  }, []);

  const countLikes = async (tweet) => {
    const call = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/tweets/${tweet._id}/likes`,
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(addRestLikes(call.data));
  };

  const handleNewTweet = (e) => {
    setNewTweet(e.target.value);
  };

  const handleCreateTweet = async (e) => {
    e.preventDefault();
    const call = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/tweets`,
      data: { text: newTweet },
      headers: { authorization: `Bearer ${token}` },
    });
    setNewTweet("");
    dispatch(createTweet(call.data.newTweet));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    tweets &&
    user && (
      <>
        <div className="container">
          <div className="row">
            <div className="col-2 col-md-3">
              <div className="text-white d-flex flex-column px-4 sticky-top nav-bar-left-col ">
                <i className="bi bi-twitter-x mb-3 mt-4"></i>
                <div className="d-flex justify-content-center justify-content-md-start">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-decoration-none text-white fw-bold"
                        : "text-decoration-none text-white"
                    }
                    to="/"
                  >
                    <div className="">
                      <i className="bi bi-house-door mb-3 d-md-none text-center "></i>
                    </div>
                    <div className=" d-none d-md-flex">
                      <i className="bi bi-house-door me-2"></i>
                      <p className=""> Home</p>
                    </div>
                  </NavLink>
                </div>
                <div className="d-flex mb-1 justify-content-center justify-content-md-start">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-decoration-none text-white fw-bold"
                        : "text-decoration-none text-white"
                    }
                    to={`/profile/${user.username}`}
                  >
                    <i className="bi bi-person-fill d-md-none mt-3"></i>
                    <div className="d-md-flex d-none">
                      <i className="bi bi-person-fill me-2"></i>
                      <p className="d-none d-md-block">Profile</p>
                    </div>
                  </NavLink>
                </div>

                <div className="d-flex mb-1 justify-content-center justify-content-md-start">
                  <button
                    onClick={showModal}
                    className="text-center btn btn-primary fw-bold rounded-circle d-md-none"
                  >
                    <i className="bi bi-pen-fill"></i>
                  </button>
                  <button
                    onClick={showModal}
                    className="btn btn-primary fw-bold rounded-pill w-100 d-md-block d-none"
                  >
                    Tweet
                  </button>
                </div>
                <div className="d-flex mb-1 justify-content-center justify-content-md-start mt-auto">
                  <button
                    onClick={showModal}
                    className="text-center btn btn-danger fw-bold rounded-circle d-md-none"
                  >
                    <i class="bi bi-arrow-left-square-fill"></i>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger fw-bold rounded-pill d-md-block d-none w-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="col-8 col-md-6 mt-4 border-column-center rounded">
              <div className="py-4">
                <div className="px-4">
                  <h4 className="text-white">Home</h4>
                  <img
                    className="img-fluid avatar-styles-tweet mb-3 rounded-circle"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJkeE18SkHetImZXrAOcFa-WpGA3uXzPIrA&s"
                    alt="user avatar"
                  />
                  <form onSubmit={handleCreateTweet}>
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="What's happening?"
                    >
                      <Form.Control
                        onChange={handleNewTweet}
                        value={newTweet}
                        className="mb-3"
                        as="textarea"
                        placeholder="What's happening?"
                        style={{ height: "100px" }}
                      />
                      <div className="d-flex text-center">
                        <button className="btn btn-primary fw-bold px-4 rounded-pill ms-auto mb-3">
                          Tweet
                        </button>
                      </div>
                    </FloatingLabel>
                  </form>
                </div>
                {tweets.map((tweet, index, array) => (
                  /* if (index + 1 === array.length) {
                } */

                  <div key={index} className="border-tweet p-2 d-flex">
                    <div className=" p-2 me-3">
                      <Link to={`/profile/${tweet.user.username}`}>
                        <img
                          className="avatar-styles-tweet rounded-circle"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJkeE18SkHetImZXrAOcFa-WpGA3uXzPIrA&s"
                          alt="user avatar"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="text-decoration-none"
                        to={`/profile/${tweet.user.username}`}
                      >
                        <p className="fw-bold text-white m-0">
                          {tweet.user.firstname} {tweet.user.lastname}
                        </p>
                      </Link>

                      <p className="text-white mb-1">{tweet.text} </p>
                      {tweet.likes.includes(user._id) ? (
                        <div className="d-flex align-items-start">
                          <i
                            onClick={() => countLikes(tweet)}
                            className="bi bi-heart-fill text-danger m-0 me-1 cursor-pointer"
                          ></i>
                          <p className="text-danger">{tweet.likes.length}</p>
                        </div>
                      ) : (
                        <div className="d-flex align-items-start">
                          <i
                            onClick={() => countLikes(tweet)}
                            className="bi bi-heart text-danger m-0 me-1 cursor-pointer"
                          ></i>
                          <p className="text-danger">{tweet.likes.length}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-2 col-md-3">
              <div className="px-2 sticky-top">
                <div className="right-container-home rounded text-secondary p-3 mt-4">
                  <p className="fs-5 text-white paragraph-top-col-right d-none d-md-block">
                    What´s happening
                  </p>
                  <div className="">
                    <p className="m-0">hola</p>
                    <p className="fw-bold m-0 text-white">#hola</p>
                    <p className="">55.5K Tweets</p>
                  </div>
                  <div className="">
                    <p className="m-0">hola</p>
                    <p className="fw-bold m-0 text-white">#hola</p>
                    <p className="">55.5K Tweets</p>
                  </div>
                  <div className="d-none d-md-block">
                    <p className="m-0">hola</p>
                    <p className="fw-bold m-0 text-white">#hola</p>
                    <p className="">55.5K Tweets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={modal} onHide={hideModal}>
          <Modal.Body className="p-4">
            <div className="d-flex fw-bold">
              <i
                onClick={hideModal}
                className="bi bi-x-circle ms-auto text-danger cursor-pointer fs-5 icon-modal-x"
              ></i>
            </div>
            <p className="fw-bold m-0 mb-2">What are you thinking?</p>
            <form onSubmit={handleCreateTweet}>
              <label hidden></label>
              <input
                onChange={handleNewTweet}
                value={newTweet}
                className="form-control mb-3"
                type="text"
                name="inputTweet"
                id="inputTweet"
                placeholder="Write your thoughts..."
              />
              <div className="d-flex">
                <button
                  onClick={hideModal}
                  type="submit"
                  className="fw-bold btn btn-primary ms-auto rounded-pill"
                >
                  Tweet
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    )
  );
}

export default Home;
