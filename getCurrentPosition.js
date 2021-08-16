const getCurrentPosition = async () => { // GeolocationCoordinates
  return new Promise((resolve, reject) => {
    const options = {};
    navigator.geolocation.getCurrentPosition(
      (gpos) => {
        // success
        const p = gpos.coords;
        resolve(p);
      },
      (err) => {
        // error
        reject(err);
      },
      options);
  });
};

export { getCurrentPosition };
