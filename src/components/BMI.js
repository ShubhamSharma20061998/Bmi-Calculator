import React, { useState } from "react";
import BmiCalculator from "./BmiCalculator";

const BMI = () => {
  const [bmivalue, setBmiValue] = useState(0);
  const getBmiClass = bmivalue => {
    if (bmivalue >= 1 && bmivalue <= 18.5) return "Underweight";
    if (bmivalue >= 18.5 && bmivalue <= 24.9) return "Normal Weight";
    if (bmivalue >= 24.9 && bmivalue <= 29.9) return "Overweight";
    if (bmivalue >= 30) return "Obese ";
  };
  const bmiBackgroundColor = bmivalue => {
    if (bmivalue >= 1 && bmivalue <= 18.5) return "#fed88b";
    if (bmivalue >= 18.5 && bmivalue <= 24.9) return "#80ff80";
    if (bmivalue >= 24.9 && bmivalue <= 29.9) return "#ff7f50";
    if (bmivalue >= 30) return "#ff5411 ";
  };
  const bmiCategory = getBmiClass(bmivalue);
  let bmiClass = "";
  if (bmivalue > 0 && bmiCategory) {
    bmiClass = bmiCategory.split(" ")[0].toLowerCase();
  }
  return (
    <>
      <div
        className="calculator container"
        style={{ backgroundColor: bmiBackgroundColor(bmivalue) }}
      >
        <h3>Body Mass Index Calculator</h3>
        <div className="bmi-result-container">
          <div className="bmi-result">
            <div className="bmi-result-number">
              Body Mass Index (BMI) = {bmivalue}
            </div>
            <div className={`bmi-category ${bmiClass}`}>{bmiCategory}</div>
          </div>
        </div>
        <BmiCalculator getBmiValue={setBmiValue} />
      </div>
    </>
  );
};

export default BMI;
