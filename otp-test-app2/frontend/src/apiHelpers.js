import axios from "axios";

const apiRequest = ({ method, url }) => {
  return new Promise((resolve, reject) => {
    axios({ method, url })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export { apiRequest };
