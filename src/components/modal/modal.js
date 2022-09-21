import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FirstStep from "../firstStep/firstStep";
import "./modal.css";
import rotate from "../../assets/rotate.png";
import req from "../../assets/req.png";
import close from "../../assets/close.png";

const steps = ["Select Expression", "Define Rule Set", "Create Rule"];

export default function Modal() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [selectedRule, setRule] = useState(false);
  const isStepOptional = (step) => {
    return step === 1;
  };
  const [hide, setHide] = useState(false);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setHide(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <Box sx={{ width: "100%" }}>
          <div className="modal-main-header">
            <div className="modal-header">
              <h1>Rule Builder </h1>
              <img src={req} className="require-img" />
            </div>
            <div>
              <img src={close} />
            </div>
          </div>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <div className="last-step">
                <img src={rotate} />
                <p className="finished-text">Sign the transaction...</p>
              </div>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FirstStep
                activeStep={handleNext}
                setRule={setRule}
                hide={hide}
                setHide={setHide}
              />
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />

                {hide && (
                  <Button onClick={handleNext} disabled={!selectedRule}>
                    {activeStep === steps.length - 1 ? "Finish" : "Create Rule"}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
}
