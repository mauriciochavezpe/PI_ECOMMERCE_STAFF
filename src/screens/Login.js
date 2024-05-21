import React, { useEffect } from "react";
import { getMyUser } from "../store/slice/sliceUserLogin";
import { useDispatch, useSelector } from "react-redux";

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
  let objCurrent = {};
  if (code) {
    if (!localStorage.getItem("TOKEN_COGNITO")) {
      objCurrent.code = code;
    } else {
      let data = localStorage.getItem("TOKEN_COGNITO");
      objCurrent = JSON.parse(data);
      objCurrent.code = code;
    }
    localStorage.setItem("TOKEN_COGNITO", JSON.stringify(objCurrent));
    dispatch(getMyUser());

    window.location.href = window.location.origin;
  }

  useEffect(() => {}, [isLogin]);

  return (
    <>
      <p>{isLogin ? "Estas logeado" : "no estas logeado"}</p>
    </>
  );
};

export default Login;
