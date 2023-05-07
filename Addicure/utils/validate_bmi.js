const validateBmi = (bmi, setBmiValue) => {
    if (bmi < 18.5) {
      setBmiValue("Underweight");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiValue("Ideal");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setBmiValue("Overweight");
    } else if (bmi >= 30) {
      setBmiValue("Obese");
    }
  };

  module.exports = validateBmi;