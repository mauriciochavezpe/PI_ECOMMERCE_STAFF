import { IsLogin } from "../store/slice/sliceUserLogin";
import store from "../store/index";

const apiKey = process.env.REACT_APP_API_URL;
const client_id = process.env.REACT_APP_client_id;
const client_secret = process.env.REACT_APP_client_secret;
const redirect_uri = process.env.REACT_APP_redirect_uri;
const response_type = process.env.REACT_APP_response_type;
const url_customer = process.env.REACT_APP_URL_OAUTH_CUSTOMER;
const url_staff = process.env.REACT_APP_URL_OAUTH_STAFF;

const oauth2 = () => {
  // const dispatch = useDispatch();

  let dataAPI = JSON.parse(localStorage.getItem("TOKEN_COGNITO")).code;
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", dataAPI.trim()); // GENERADO POR EL LOGIN
  urlencoded.append("redirect_uri", redirect_uri);
  urlencoded.append("client_id", client_id);
  urlencoded.append("client_secret", client_secret);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
  let url = "";
  fetch(
    url_customer+"/oauth2/token",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let x = JSON.parse(result);
      localStorage.setItem(
        "TOKEN_COGNITO",
        JSON.stringify({ oauth2: x.id_token, code: dataAPI })
      );
      store.dispatch(IsLogin(true));
    })
    .catch((error) => console.error(error));
};
const authorizateCode = () => {
  let sURL = `https://pi-be-customers-domain.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
  console.log(sURL);
  window.location.href = sURL;
};
const authorizateCodeAdmin = () => {
  let sURL = `https://pi-be-staff-domain.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
  console.log(sURL);
  window.location.href = sURL;
};

const logout = () => {
  let sURL =
    "https://pi-be-customers-domain.auth.us-east-1.amazoncognito.com/logout?client_id=5qg08jljj96u9flssf4ibvgab4&logout_uri=https://pi-1-ecommerce-2023.vercel.app";
  console.log(sURL);
  localStorage.removeItem("TOKEN_COGNITO");
  window.location.href = sURL;
};

export { oauth2, authorizateCode, logout,authorizateCodeAdmin };
