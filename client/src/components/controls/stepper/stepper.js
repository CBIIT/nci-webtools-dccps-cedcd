import React from "react";
import classNames from "classnames";
import "./stepper.scss";

export default function Stepper({ steps, activeStep, onSelect, className = "" }) {
  return (
    <div className={classNames("stepper", className)}>
      {steps.map(({ label, value }, i) => (
        <div
          key={`step-${i}-${value}`}
          className={classNames("step", value === activeStep && "active")}
          style={{ width: `${100 / steps.length}%` }}
          role="button">
          <div className="step-label-container">
            <div className="step-label" onClick={(_) => onSelect(value)}>
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
