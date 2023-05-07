const calculateCalories = (age, sex, setCalories) => {
    if (sex === "Female") {
      if (age >= 19 && age <= 30) {
        setCalories("2000-2400");
      } else if (age >= 31 && age <= 59) {
        setCalories("1800-2200");
      } else if (age >= 60) {
        setCalories("1600-2000");
      }
    } else if (sex === "Male") {
      if (age >= 19 && age <= 30) {
        setCalories("2400-3000");
      } else if (age >= 31 && age <= 59) {
        setCalories("2200-3000");
      } else if (age >= 60) {
        setCalories("2000-2600");
      }
    }
  };

  module.exports = calculateCalories;