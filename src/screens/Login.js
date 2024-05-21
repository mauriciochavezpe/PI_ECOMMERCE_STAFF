import React, { useEffect } from "react";
import { getMyUser } from "../store/slice/sliceUserLogin";
import { useDispatch, useSelector } from "react-redux";
import { oauth2 } from "../util/oAuth";

const Login = () => {
  //https://pi-1-ecommerce-2023-mauriciochavezpes-projects.vercel.app/?code=7bbd404e-7395-4a05-8f64-d1d197054888
  const dispatch = useDispatch();
  const { isLogin, value } = useSelector((state) => state.userLogin);

  // Obtener la URL actual
  const url = window.location.href;

  // Crear un objeto URL
  const urlObj = new URL(url);

  // Obtener el valor del parámetro "code"
  const code = urlObj.searchParams.get("code");
  debugger;
  console.log("adadasdsadasd", code);

  const initAuth2 = (code) => {
    console.log("dasdadas");
    let objCurrent = {};
    if (code) {
      if (!localStorage.getItem("TOKEN_COGNITO")) {
        objCurrent.code = code;
      } else {
        let data = localStorage.getItem("TOKEN_COGNITO");
        objCurrent = JSON.parse(data);
        objCurrent.code = code;
      }
      if (!objCurrent.oauth2) {
        localStorage.setItem("TOKEN_COGNITO", JSON.stringify(objCurrent));
        oauth2();
      }
    }
  };

  useEffect(() => {
    initAuth2(code);
  }, [initAuth2]);

  return (
    <>
      <p>{isLogin ? "Estas logeado" : "no estas logeado"}</p>
    </>
  );
};

export default Login;
