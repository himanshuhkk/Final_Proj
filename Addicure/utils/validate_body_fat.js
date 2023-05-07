const validateBodyFat = (userInfo, bodyFat, setBodyFatValue) => {
    if (userInfo?.sex === "Male") {
      if (bodyFat === 10 && bodyFat <= 12) {
        setBodyFatValue("Essential Fat");
      } else if (bodyFat === 14 && bodyFat <= 20) {
        setBodyFatValue("Athletes");
      } else if (bodyFat === 21 && bodyFat <= 24) {
        setBodyFatValue("Fitness");
      } else if (bodyFat === 25 && bodyFat <= 31) {
        setBodyFatValue("Average");
      } else if (bodyFat >= 32) {
        setBodyFatValue("Obese");
      }
    } else {
      if (bodyFat === 2 && bodyFat <= 4) {
        setBodyFatValue("Essential Fat");
      } else if (bodyFat === 6 && bodyFat <= 13) {
        setBodyFatValue("Athletes");
      } else if (bodyFat === 14 && bodyFat <= 17) {
        setBodyFatValue("Fitness");
      } else if (bodyFat === 18 && bodyFat <= 25) {
        setBodyFatValue("Average");
      } else if (bodyFat >= 26) {
        setBodyFatValue("Obese");
      }
    }
  };

  module.exports = validateBodyFat;