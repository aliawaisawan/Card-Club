import React, { useRef } from "react";
import Footer from "../components/Footer";
import RecentOrder from "../components/Profile/RecentOrder";
import PersonalInfo from "../components/Profile/PersonalInfo";
import ChangePassword from "../components/Profile/ChangePassword";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UilPen } from "@iconscout/react-unicons";
import { setUser } from "../redux/actions/userProfile";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const userData = useSelector((state) => state.userDetails.user);

  const imageRef = useRef();

  const handleImageChange = (event) => {
    handleUpdateProfilePicture(event.target.files[0]);
  };

  const ProfilePicWrapper = styled.div`
    color: transparent;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    input {
      display: none;
    }

    img {
      position: absolute;
      object-fit: cover;
      width: 90px;
      height: 90px;
      box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
      border-radius: 100px;
      z-index: 0;
    }

    label {
      cursor: pointer;
      height: 90px;
      width: 90px;
    }

    &:hover {
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        color: rgb(250, 250, 250);
        transition: background-color 0.2s ease-in-out;
        border-radius: 100px;
      }
    }

    span {
      display: inline-flex;
      padding: 0.2em;
      justify-content: center;
    }
  `;

  const handleUpdateProfilePicture = (file) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("user_image", file, "[PROXY]");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}details`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          dispatch(setUser(result.user));
          const image = imageRef.current;
          image.src = result.user.image_path;
          toast("Profile Picture Updated");
        } else {
          toast("Internal Server Error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <section className="full-content">
      <Navigation />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between flex-wrap mt-3">
            <div className="d-flex gap-4">
              {/* <img
                  src="assets/images/products/profile.png"
                  alt=""
                  width={90}
                  height={90}
                  className=""
                  style={{borderRadius: '50%'}}
                /> */}
              <ProfilePicWrapper>
                <label htmlFor="file">
                  <span>
                    <UilPen size="18"></UilPen>
                  </span>
                  <span>Edit</span>
                </label>
                <input
                  id="file"
                  type="file"
                  name="profile"
                  onChange={handleImageChange}
                />
                {userData?.image_path === null ? (
                  <img
                    src="assets/images/icons/user.png"
                    ref={imageRef}
                    alt="profile"
                    width="200"
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_IMAGE_URL}${userData?.image_path}`}
                    ref={imageRef}
                    alt="profile"
                    width="200"
                  />
                )}
              </ProfilePicWrapper>
              <div className="mt-2">
                <h3>{userData?.name}</h3>
                <p>{userData?.email}</p>
              </div>
            </div>
            <div className="logout">
              <button
                onClick={handleLogout}
                className="btn btn-block bg-pink text-light btn-lg mt-4"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <PersonalInfo
        name={userData?.company_name}
        role={userData?.company_role}
        zip={userData?.zip_code}
        salary={userData?.salary}
        country={userData?.country_id}
        state={userData?.state_id}
        city={userData?.city_id}
        dob={userData?.dob}
      />
      <ChangePassword />
      <RecentOrder />
      {/* <Interests /> */}
      <Footer />
    </section>
  );
}

export default Profile;
