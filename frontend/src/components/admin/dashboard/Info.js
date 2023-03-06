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
  let [information, setInformation] = useState([]);
  let [info, setInfo] = useState(initialInfoState);
  let [currentInfo, setCurrentInfo] = useState(initialInfoState);
  //const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveInfo();
  });

  const retrieveInfo = () => {
    InfoService.getAll()
      .then((res) => {
        information = res.data;
        var info = information.find((item) => item.name === "");
        //info = information[0];
        console.log("Info:", info);
        //console.log("Info:", Object.values(info)[5]);
        console.log("Info:", info.instagram);
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
    //console.log("currentInfo:", currentInfo);
    InfoService.update(currentInfo)
      .then((res) => {
        console.log(res.data);
        //setMessage("Info was updated successfully!");
        refreshInfo();
      })
      .catch((err) => {
        console.log("Error while updating info:", err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    currentInfo[name] = value;
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
              className="form-control"
              id="name"
              name="name"
              value={currentInfo.name}
              placeholder={info.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="email">Email Address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={currentInfo.email}
              placeholder={info.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={currentInfo.phone}
              placeholder={info.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="address">Gallery Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={currentInfo.address}
              placeholder={info.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="facebook">Facebook</label>
            <input
              type="text"
              className="form-control"
              id="facebook"
              name="facebook"
              value={currentInfo.facebook}
              placeholder={info.facebook}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="instagram">Instagram</label>
            <input
              type="text"
              className="form-control"
              id="instagram"
              name="instagram"
              value={currentInfo.instagram}
              placeholder={info.instagram}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="imageURL">Profile Image</label>
            <input
              type="text"
              className="form-control"
              id="imageURL"
              name="imageURL"
              value={currentInfo.imageURL}
              placeholder={info.imageURL}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3 form-group">
            <label className="mb-1" htmlFor="bio">Bio</label>
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              value={currentInfo.bio}
              placeholder={info.bio}
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
    </div>
  );
}

export default Info;

/*
<p className="float-end">{message}</p>
*/
