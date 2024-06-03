import React, { useEffect } from "react";
import axios from "axios";

const ResponseChagpt = (props) => {
  const { state, setState } = props;
  const sURL = process.env.REACT_APP_URL_STAFF + "/chat";
  debugger;
  useEffect(async () => {
    let obj = { question: state.question };
    console.log(obj);

    let config = {
      method: "POST",
      sURL,
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: obj,
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    setState((state) => ({ ...state, payload: response }));
    // axios.post(sURL, obj).then((e) => {
    //   let response = e.data.response;
    //   setState((state) => ({ ...state, payload: response }));
    // });
  }, []);

  return <div>{state.payload}</div>;
};

export default ResponseChagpt;
