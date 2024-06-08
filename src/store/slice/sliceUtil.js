import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  departamento_list: [
    "Amazonas",
    "Ancash",
    "Apurimac",
    "Arequipa",
    "Ayacucho",
    "Cajamarca",
    "Callao",
    "Cusco",
    "Huancavelica",
    "Huanuco",
    "Ica",
    "Junin",
    "La Libertad",
    "Lambayeque",
    "Lima",
    "Loreto",
    "Madre de Dios",
    "Moquegua",
    "Pasco",
    "Piura",
    "Puno",
    "San Martin",
    "Tacna",
    "Tumbes",
    "Ucayali",
  ], // Tu array de productos inicial
  tipodocumentos: ["DNI", "CARNET DE EXTRANJERIA", "RUC", "PASAPORTE"],
  status: "success",
};

const utilCommon = createSlice({
  name: "utilCommon",
  initialState,
  reducers: {
    test(state, action) {
      state.status = "success";
    },
  },
  extraReducers: (builder) => {},
});

export const { test } =
  utilCommon.actions;
export default utilCommon.reducer;
