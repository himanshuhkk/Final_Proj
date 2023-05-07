const convertHeightInMeter = (userInfo) => {
    let foot = parseInt(userInfo?.height?.foot);
    let inch = parseInt(userInfo?.height?.inches);

    // console.log("foot", foot);
    // console.log("inch", inch);
    let height = foot * 12 + inch;
    // console.log("height", height);
    let heightInMeter = height * 0.0254;
    // console.log("heightInMeter", heightInMeter);
    return heightInMeter;
  };

  module.exports = convertHeightInMeter;