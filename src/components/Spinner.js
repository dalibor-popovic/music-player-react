import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0.5",
      }}
    >
      <FontAwesomeIcon size='4x' icon={faSpinner} spin />
    </div>
  );
};

export default Spinner;
