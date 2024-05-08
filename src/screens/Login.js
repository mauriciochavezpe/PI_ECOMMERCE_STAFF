import React from "react";
const Login = () => {
  //https://pi-1-ecommerce-2023-mauriciochavezpes-projects.vercel.app/?code=7bbd404e-7395-4a05-8f64-d1d197054888

  // Obtener la URL actual
  const url = window.location.href;

  // Crear un objeto URL
  const urlObj = new URL(url);

  // Obtener el valor del parámetro "code"
  const code = urlObj.searchParams.get("code");
  console.log(code);
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
    window.location.href = window.location.origin;
  }
  return (
    <>
      <p>login</p>
    </>
  );
};

export default Login;
