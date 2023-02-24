import React, { useEffect, useState } from "react";
// CSS
import "../../../assets/css/Info.scss";
// Services
import InfoService from "../../../services/info-service.js";

function Info() {
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
  const [message, setMessage] = useState("");

  const retrieveInfo = () => {
    InfoService.getAll()
      .then((res) => {
        setInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    retrieveInfo();
  }, []);

  const updateInfo = () => {
    InfoService.update(info)
      .then((res) => {
        setInfo(res.data);
        console.log(res.data);
        setMessage("Info was updated successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  // Render
  return (
    <div className="h100 p-4">
      <h4>WEBSITE DETAILS</h4>
      <div className="scrollbar">
        <form className="force-overflow">
          <div className="form-group">
            <label htmlFor="name">Display Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={info.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={info.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={info.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Gallery Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={info.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              className="form-control"
              id="facebook"
              name="facebook"
              value={info.facebook}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="text"
              className="form-control"
              id="instagram"
              name="instagram"
              value={info.instagram}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageURL">Profile Image</label>
            <input
              type="text"
              className="form-control"
              id="imageURL"
              name="imageURL"
              value={info.imageURL}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              value={info.bio}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
      <button type="submit" className="btn button my-3" onClick={updateInfo}>
        Save Changes
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Info;
