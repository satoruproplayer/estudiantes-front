import axios from "axios";

export interface iTarea {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha_entrega: string;
  estudianteId?: number;
}

const url = "http://localhost:4000";

export async function getTareas() {
  return await axios.get(`${url}/tareas`);
}

export async function createTarea(tarea: iTarea) {
  return await axios.post(`${url}/tareas`, tarea, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
