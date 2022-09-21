import React, { useState } from "react";
import "./firststep.css";
import first from "../../assets/first-icon.png";
import second from "../../assets/second-icon.png";
import third from "../../assets/third-icon.png";
import fourth from "../../assets/fourth-icon.png";
import required from "../../assets/required.png";
import Button from "@mui/material/Button";
import SecondStep from "../secondStep/secondStep";
import { PropaneSharp } from "@mui/icons-material";

const FirstStep = (props) => {
  const [unionTitle, setTitle] = useState(
    "Which Type of Rule do you want to create? "
  );

  const addRule = () => {
    props.activeStep();
    setTitle("Untitled Union Rule");
    props.setHide(true);
  };

  return (
    <div className="main-modal-contaiiner">
      <p className="type-text"> {unionTitle}
      </p>

      {!props.hide && (
        <>
          <div className="group-buttons">
            <div className="first-group-buttons">
              <Button
                variant="outlined"
                className="icon-buttons first-button"
                onClick={addRule}
                data-testid="add-rule"
              >
                <img src={first} />
                <p className="button-texts"> Union </p>
                <img src={required} className="button-imgs-first" />
              </Button>

              <Button variant="outlined" className="icon-buttons second-button">
                <img src={second} />
                <p className="button-texts"> Intersection </p>
                <img src={required} className="button-imgs-second" />
              </Button>
            </div>
            <div className="second-group-buttons">
              <Button variant="outlined" className="icon-buttons">
                <img src={third} />
                <p className="button-texts"> Complement </p>
                <img src={required} className="button-imgs-third" />
              </Button>

              <Button variant="outlined" className="icon-buttons fourth-button">
                <img src={fourth} />
                <p className="button-texts"> Difference </p>
                <img src={required} className="button-imgs-fourth" />
              </Button>
            </div>
          </div>
        </>
      )}
      <SecondStep
        show={props.hide}
        setTitle={setTitle}
        setRule={props.setRule}
      />
    </div>
  );
};

export default FirstStep;
