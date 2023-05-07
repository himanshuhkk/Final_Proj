const convertHeightInMeter = require("./convert_height_in_meter");
const validateBmi = require("./validate_bmi");

const calculateBMI = (userInfo, setBmi) => {
  let weightValue = parseInt(userInfo?.weight);
  let heightValue = convertHeightInMeter(userInfo);
  // console.log("heightValue", heightValue);
  // console.log("weightValue", weightValue);
  let bmi = weightValue / (heightValue * heightValue);
  setBmi(bmi);
  validateBmi(bmi);
};

module.exports = calculateBMI;
