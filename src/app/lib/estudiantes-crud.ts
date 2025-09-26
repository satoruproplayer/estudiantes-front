import axios from "axios";

export interface iEstudiante {
  id?: number;
  nombre: string;
  rut: string;
  correo: string;
}

const url = "http://localhost:4000";

export async function getEstudiantes() {
  return await axios.get(`${url}/estudiantes`);
}

export async function createEstudiante(estudiante: iEstudiante) {
  return await axios.post(`${url}/estudiantes`, estudiante, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
