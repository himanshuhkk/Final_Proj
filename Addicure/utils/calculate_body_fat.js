const validateBodyFat = require("./validate_body_fat");

const calculateBodyFat = (userInfo, setBodyFat) => {
    let weightValue = parseInt(userInfo?.weight);
    if (userInfo?.sex === "Male") {
      let bodyFat = weightValue * 0.732 + 8.987;
      setBodyFat(bodyFat);
      validateBodyFat(bodyFat);
    } else {
      let bodyFat = weightValue * 1.082 + 94.42;
      setBodyFat(bodyFat);
      validateBodyFat(bodyFat);
    }
  };

  module.exports = calculateBodyFat;