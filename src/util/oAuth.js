const apiKey = process.env.REACT_APP_API_URL;
const client_id = process.env.REACT_APP_client_id;
const client_secret = process.env.REACT_APP_client_secret;
const redirect_uri = process.env.REACT_APP_redirect_uri;
const response_type = process.env.REACT_APP_response_type;

const oauth2 = () => {
  let dataAPI = JSON.parse(localStorage.getItem("TOKEN_COGNITO")).code;
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Cookie", "XSRF-TOKEN=12655a01-df6f-4f31-b42d-ecc90eea063a");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", dataAPI); // GENERADO POR EL LOGIN
  urlencoded.append("redirect_uri", redirect_uri);
  urlencoded.append("client_id", client_id);
  urlencoded.append("client_secret", client_secret);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(
    "https://pi-be-customers-domain.auth.us-east-1.amazoncognito.com/oauth2/token",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let x = JSON.parse(result);
      localStorage.setItem("TOKEN_COGNITO", JSON.stringify({oauth2:x.id_token, code :dataAPI}));
    })
    .catch((error) => console.error(error));
};
const authorizateCode = () => {
  let sURL = `https://pi-be-customers-domain.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
  console.log(sURL);
  window.location.href = sURL;
};

export { oauth2, authorizateCode };
