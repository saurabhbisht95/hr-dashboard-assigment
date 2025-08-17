import React from "react";
import "./index.css";
import dash from "../../assets/images/dash.png";
import scroll from "../../assets/images/scroll.png";
import Logo from "../../assets/images/Logo.svg";
const Common = () => {
  return (
    <>
      <div className="register-left">
        <img className="register-dash" src={dash} alt="dashboard" width={350} />

        <div className="register-left-text">
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </h5>
          <p>
            Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>

        <img className="register-scroll" src={scroll} width={60} alt="scroll" />
      </div>
    </>
  );
};

export default Common;
