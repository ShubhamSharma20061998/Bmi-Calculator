import React, { useEffect, useState } from "react";
import FormInputs from "./FormInputs";

const BmiCalculator = ({ getBmiValue }) => {
  const [HeightUnit, setHeightUnit] = useState("cm");
  const [WeightUnit, setWeightUnit] = useState("kg");
  const [Unit, setUnit] = useState("Metric");
  const [count, setCount] = useState({
    HeightCount: "",
    WeightCount: "",
    InchesCount: "",
  });
  const { HeightCount, WeightCount, InchesCount } = count;
  const onChangeInput = e => {
    const { name, value } = e.target;
    setCount(pervState => ({
      ...pervState,
      [name]: value,
    }));
  };
  const onSelectChange = e => {
    setUnit(e.target.value);
    if (e.target.value === "Metric") {
      setHeightUnit("cm");
      setWeightUnit("kg");
    } else {
      setHeightUnit("ft");
      setWeightUnit("lbs");
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    setCount({ HeightCount: "", WeightCount: "", InchesCount: "" });
    setHeightUnit("cm");
    setWeightUnit("kg");
    getBmiValue(0);
  };
  const metricBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      const heightToMeter = height / 100;
      const bmi = weight / Math.pow(heightToMeter, 2);
      getBmiValue(Math.round(bmi));
    }
  };
  const imperialBMI = (height, weight, inches) => {
    if (height > 0 && weight > 0 && inches > 0) {
      const heightToInches = height * 12 + parseInt(inches);
      const bmi = 703 * (weight / Math.pow(heightToInches, 2));
      getBmiValue(Math.round(bmi));
    }
  };
  useEffect(() => {
    metricBMI(HeightCount, WeightCount);
    imperialBMI(HeightCount, WeightCount, InchesCount);
    //eslint-disable-next-line
  }, [HeightCount, WeightCount, InchesCount]);
  return (
    <>
      <div className="bmi-inputs">
        <div className="input-fields">
          <span className="label-unit">Unit</span>
          <select
            name="unit"
            value={Unit}
            onChange={onSelectChange}
            className="form-control form-control-sm"
          >
            <option value="Metric">Metric</option>
            <option value="Imperial">Imperial</option>
          </select>
        </div>
        <FormInputs
          type="text"
          name="HeightCount"
          title={`Height (${HeightUnit})`}
          value={HeightCount}
          onChange={onChangeInput}
        />
        {Unit === "Imperial" ? (
          <FormInputs
            type="text"
            name="InchesCount"
            title={`(in)`}
            value={InchesCount}
            onChange={onChangeInput}
          />
        ) : (
          ""
        )}
        <FormInputs
          type="text"
          name="WeightCount"
          title={`Weight (${WeightUnit})`}
          value={WeightCount}
          onChange={onChangeInput}
        />
      </div>
      <button className="button" type="submit" onClick={onSubmit}>
        Reset
      </button>
    </>
  );
};

export default BmiCalculator;
