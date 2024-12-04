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
  const [modalLogout, setModalLogout] = useState(false);
  const [newTweet, setNewTweet] = useState("");

  const token = useSelector((state) => state.token);
  const tweets = useSelector((state) => state.tweet);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

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
    dispatch(logout(""));
    setModalLogout(false);
    navigate("/login");
  };

  const showModalLogout = () => {
    setModalLogout(true);
  };

  const hideModalLogout = () => {
    setModalLogout(false);
  };

  return (
    tweets &&
    user && (
      <>
        <div className="container">
          <div className="row mt-4">
            <div className="col-2">
              <div className="text-white d-flex flex-column align-items-center align-items-md-start px-4 nav-bar-left-col ">
                <i className="bi bi-twitter-x mb-2 mb-md-3"></i>
                <div className="d-flex justify-content-center justify-content-md-start">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-decoration-none text-white fw-bold mb-2"
                        : "text-decoration-none text-white mb-2"
                    }
                    to="/"
                  >
                    <i className="bi bi-house-door d-md-none text-center"></i>
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
                        ? "text-decoration-none text-white fw-bold mb-2"
                        : "text-decoration-none text-white mb-2"
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
                    className="button-tweet-icon d-md-none"
                  >
                    <i className="bi bi-pen-fill"></i>
                  </button>
                  <button
                    onClick={showModal}
                    className="button-tweet-styles rounded-pill d-md-block d-none"
                  >
                    Tweet
                  </button>
                </div>
                <div className="d-flex mb-1 justify-content-center justify-content-md-start mt-auto">
                  <button
                    onClick={showModalLogout}
                    className="button-logout-icon d-md-none"
                  >
                    <i className="bi bi-arrow-left-square-fill"></i>
                  </button>
                  <button
                    onClick={showModalLogout}
                    className="button-logout-styles rounded-pill d-md-block d-none"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="col-10 col-md-7 border-column-center rounded">
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
                        <button
                          onClick={showModal}
                          className="button-tweet-styles rounded-pill ms-auto mb-3"
                        >
                          Tweet
                        </button>
                      </div>
                    </FloatingLabel>
                  </form>
                </div>
                {tweets.map((tweet, index, array) => (
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
            <div className="col-2 col-md-3 d-none d-md-block">
              <div className="px-2 col-right-styles">
                <div className="right-container-home rounded text-secondary p-3">
                  <p className="fs-5 text-white paragraph-top-col-right d-none d-md-block">
                    What´s happening
                  </p>
                  <div className="">
                    <p className="m-0">Tesla</p>
                    <p className="fw-bold m-0 text-white">#new</p>
                    <p className="">6.9K Tweets</p>
                  </div>
                  <div className="">
                    <p className="m-0">Moon</p>
                    <p className="fw-bold m-0 text-white">#space</p>
                    <p className="">99.3M Tweets</p>
                  </div>
                  <div className="d-none d-md-block">
                    <p className="m-0">Hello</p>
                    <p className="fw-bold m-0 text-white">#hola</p>
                    <p className="">15.5K Tweets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Create tweet Modal */}
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
                  className="button-tweet-styles ms-auto rounded-pill"
                >
                  Tweet
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/*  modal Logout */}
        <Modal show={modalLogout} onHide={hideModalLogout}>
          <Modal.Body className="p-4">
            <div className="d-flex fw-bold">
              <i
                onClick={hideModalLogout}
                className="bi bi-x-circle ms-auto text-danger cursor-pointer fs-5 icon-modal-x"
              ></i>
            </div>
            <p className="fw-bold m-0 mb-4">Are you sure you want to logout?</p>
            <label hidden></label>
            <div className="d-flex">
              <button
                onClick={handleLogout}
                type="button"
                className="button-tweet-styles rounded-pill"
              >
                Yes, I am sure
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  );
}

export default Home;
