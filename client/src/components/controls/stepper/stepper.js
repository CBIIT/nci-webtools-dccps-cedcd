import React from "react";
import "./stepper.scss";

export default function Stepper({ steps, activeStep, onSelect }) {
  return (
    <div className="stepper">
      {steps.map(({ label, value }, i) => (
        <div
          key={`step-${i}-${value}`}
          className={`step ${value === activeStep && "active"}`}
          role="button"
          onClick={(e) => onSelect(value)}>
          <div className="step-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
