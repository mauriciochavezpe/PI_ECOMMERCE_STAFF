// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
const oauth2 = ()=>{
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "XSRF-TOKEN=12655a01-df6f-4f31-b42d-ecc90eea063a");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", "e422b5db-ab4f-4a5d-9e5a-ac08f3e8f4e8"); // GENERADO POR EL LOGIN
    urlencoded.append("redirect_uri", "https://pi-1-ecommerce-2023.vercel.app/");
    urlencoded.append("client_id", process.env.REACT_APP_client_id);
    urlencoded.append("client_secret", process.env.REACT_APP_client_secret);
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };
    
    fetch("https://pi-be-customers-domain.auth.us-east-1.amazoncognito.com/oauth2/token", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let x = JSON.parse(result)
            localStorage.setItem('TOKEN_COGNITO', x.id_token);
      })
      .catch((error) => console.error(error));

}    

export default oauth2