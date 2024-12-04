import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../redux/tokenSlice";
import { addRestLikes, createTweet } from "../../redux/tweetSlice";
import { NavLink, useParams, useNavigate } from "react-router-dom";

function Profile() {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newTweet, setNewTweet] = useState("");
  const [profile, setProfile] = useState(null);

  const token = useSelector((state) => state.token);
  const tweets = useSelector((state) => state.tweet);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const showEditModal = () => {
    setEditModal(true);
  };

  const hideEditModal = () => {
    setEditModal(false);
  };

  const handleNewTweet = (e) => {
    setNewTweet(e.target.value);
  };

  useEffect(() => {
    const getUser = async () => {
      const call = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/${params.username}`,
        headers: { authorization: `Bearer ${token}` },
      });
      setProfile(call.data);
    };
    getUser();
  }, [params.username]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const countLikes = async (tweet) => {
    const call = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/tweets/${tweet._id}/likes`,
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(addRestLikes(call.data));
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
  return (
    profile && (
      <>
        <div>
          <div className="container py-4">
            <div className="row">
              <div className="col-2 col-md-3">
                <div className="text-white d-flex flex-column px-4 sticky-top nav-bar-left-col ">
                  <i className="bi bi-twitter-x mb-3"></i>
                  <div className="d-flex justify-content-center justify-content-md-start">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-decoration-none text-white fw-bold"
                          : "text-decoration-none text-white"
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
                <img
                  className="img-fluid profile-poster rounded-top"
                  src="https://media-cdn.tripadvisor.com/media/photo-s/0a/bc/a7/c5/fewa-lake-and-pokhara.jpg"
                  alt="profile poster"
                />
                <div className="border-column-center-profile pt-3">
                  <img /*src={user.avatar}*/
                    className="img-fluid avatar-styles-profile rounded-circle"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJkeE18SkHetImZXrAOcFa-WpGA3uXzPIrA&s"
                    alt="avatar profile"
                  />
                  <div className="px-3 position-relative">
                    <div className="d-flex">
                      <i
                        onClick={showEditModal}
                        className="bi bi-pencil-fill text-warning cursor-pointer pencil-icon-profile"
                      ></i>
                    </div>
                    <div className="d-flex mt-4">
                      <div>
                        <p className="fs-5 fw-bold text-white m-0">
                          {profile.firstname} {profile.lastname}
                        </p>
                        <p className="text-secondary">{`@${profile.username}`}</p>
                      </div>

                      <div className="d-flex justify-content-end ms-auto div-followers-profile">
                        <p className="me-2 text-secondary">
                          <span className="text-white me-1">
                            {profile.followers.length}
                          </span>
                          Followers
                        </p>
                        <p className="text-secondary">
                          <span className="text-white me-1">
                            {profile.following.length}
                          </span>
                          Following
                        </p>
                      </div>
                    </div>
                    <p className="text-white">{profile.bio}</p>
                  </div>

                  {tweets
                    .filter((t) => t.user._id === profile._id)
                    .reverse()
                    .map((tweet, index) => (
                      <div key={index} className="border-tweet p-2 d-flex">
                        <div className=" p-2 me-3">
                          <img
                            className="img-fluid avatar-styles-tweet rounded-circle"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJkeE18SkHetImZXrAOcFa-WpGA3uXzPIrA&s"
                            alt="user avatar"
                          />
                        </div>
                        <div>
                          <p className="fw-bold text-white m-0">
                            {profile.firstname} {profile.lastname}
                          </p>
                          <p className="text-white mb-1">{tweet.text} </p>
                          {tweet.likes.includes(user._id) ? (
                            <div className="d-flex align-items-start">
                              <i
                                onClick={() => countLikes(tweet)}
                                className="bi bi-heart-fill text-danger m-0 me-1 cursor-pointer"
                              ></i>
                              <p className="text-danger">
                                {tweet.likes.length}
                              </p>
                            </div>
                          ) : (
                            <div className="d-flex align-items-start">
                              <i
                                onClick={() => countLikes(tweet)}
                                className="bi bi-heart text-danger m-0 me-1 cursor-pointer"
                              ></i>
                              <p className="text-secondary">
                                {tweet.likes.length}
                              </p>
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
        <Modal show={editModal} onHide={hideEditModal}>
          <Modal.Body className="p-4">
            <div className="d-flex fw-bold">
              <i
                onClick={hideEditModal}
                className="bi bi-x-circle ms-auto text-danger cursor-pointer fs-5 icon-modal-x"
              ></i>
            </div>
            <p className="fw-bold m-0 mb-4 fs-5 text-center">Change your bio</p>
            <form onSubmit={handleCreateTweet}>
              <label className="fw-bold mb-1">Add a Bio</label>
              <input
                onChange={handleNewTweet}
                value={newTweet}
                className="form-control mb-3"
                type="text"
                name="inputBio"
                id="inputBio"
                placeholder="Tell us about yourself..."
              />
              <label className="fw-bold mb-1">Update your image</label>
              <input
                onChange={handleNewTweet}
                value={newTweet}
                className="form-control mb-3"
                type="file"
                name="inputImage"
                id="inputImage"
                placeholder="Tell us about yourself..."
              />
              <div className="d-flex justify-content-end">
                <button
                  onClick={hideEditModal}
                  type="button"
                  className="fw-bold btn btn-danger rounded-pill me-1 px-3"
                >
                  Cancel
                </button>
                <button
                  onClick={hideEditModal}
                  type="submit"
                  className="fw-bold btn btn-success px-4 ms-1 rounded-pill"
                >
                  Edit
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    )
  );
}

export default Profile;
