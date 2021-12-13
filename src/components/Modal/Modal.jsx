import React, { useState } from "react";
import ReactModal from "react-modal";

import style from "./modal.module.scss";

ReactModal.setAppElement("#root");

const Modal = ({ modalProps, setModalProps, cities, setCities }) => {
  const [city, setCity] = useState("");
  const { isOpen, index } = modalProps;

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleClose = () => {
    setModalProps({ index: null, isOpen: false });
  };

  const handleAddCity = () => {
    const newCities = [...cities];
    newCities.splice(index, 1, { index, city });
    setCities(newCities);
    handleClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className={style.wrap}
      onRequestClose={handleClose}
    >
      <h3>Enter city name</h3>
      <input type="text" onChange={handleCityChange} />
      <br />
      <button onClick={handleAddCity}>Ok</button>
    </ReactModal>
  );
};

export default Modal;
