import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// CSS
import "../../../assets/css/Info.scss";
// Services
import InfoService from "../../../services/info-service.js";

function Info() {
  let navigate = useNavigate();
  const initialInfoState = {
    address: "",
    bio: "",
    email: "",
    facebook: "",
    imageURL: "",
    instagram: "",
    name: "",
    phone: "",
  };
  const [info, setInfo] = useState(initialInfoState);
  //let [information, setInformation] = useState([]);
  //let [currentInfo, setCurrentInfo] = useState(initialInfoState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveInfo();
  }, []);

  const retrieveInfo = () => {
    InfoService.getAll()
      .then((res) => {
        //information = res.data;
        //var info = information.find((item) => item.name === "");
        //info = information[0];
        //console.log("Info:", Object.values(info)[5]);
        setInfo(res.data);
        console.log("Info:", res.data);
      })
      .catch((err) => {
        console.log("Error while retrieving info:", err);
      });
  };

  // refresh Info
  const refreshInfo = () => {
    navigate("");
    retrieveInfo();
    //setCurrentInfo(initialInfoState);
  };

  const updateInfo = () => {
    InfoService.update(info)
      .then((res) => {
        setInfo(res.data);
        console.log(res.data);
        setMessage("Info was updated successfully!");
        refreshInfo();
      })
      .catch((err) => {
        console.log("Error while updating info:", err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    //currentInfo[name] = value;
    //setCurrentInfo({ ...currentInfo, [name]: value });
    //console.log("current", currentInfo);
  };

  // Render
  return (
    <div className="h100">
      <h3 className="px-4 pt-4 pb-2">INFO</h3>
      <nav className="navbar navbar-expand bg-navbar px-3">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <span className="nav-link nav-text">CONTACT</span>
          </li>
        </div>
      </nav>
      <div className="scrollbar m-5 w-form">
        <form className="force-overflow">
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="name">Display Name</label>
            <input
              type="text"
              className="form-control bg-off-white"
              id="name"
              name="name"
              value={info.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="email">Email Address</label>
            <input
              type="text"
              className="form-control bg-off-white"
              id="email"
              name="email"
              value={info.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control bg-off-white"
              id="phone"
              name="phone"
              value={info.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="address">Gallery Address</label>
            <input
              type="text"
              className="form-control bg-off-white"
              id="address"
              name="address"
              value={info.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="facebook">Facebook</label>
            <input
              type="text"
              className="form-control bg-off-white"
              id="facebook"
              name="facebook"
              value={info.facebook}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="instagram">Instagram</label>
            <input
              type="text"
              className="form-control bg-off-white"
              id="instagram"
              name="instagram"
              value={info.instagram}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="bio">Bio</label>
            <input
              type="text"
              className="form-control bg-off-white"
              id="bio"
              name="bio"
              value={info.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <button type="submit" className="btn button my-3" onClick={updateInfo}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <p className="float-end">{message}</p>
    </div>
  );
};

export default Info;

/*
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="imageURL">Profile Image</label>
            <input
              type="text"
              className="form-control bg-off-white"
              id="imageURL"
              name="imageURL"
              value={info.imageURL}
              onChange={handleInputChange}
            />
          </div>
*/
