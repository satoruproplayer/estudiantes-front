import axios from "axios";

export interface iEstudiante {
    id?: string;
    nombre: string;
    rut: string;
    correo: string;
}

export interface iTarea {
    id?: number;
    titulo: string;
    descripcion: string;
    fecha_entrega: string;
    estudiante: iEstudiante;
}
const url = "http://localhost:4000"

export async function getEstudiantes() {
    return await axios.get(`${url}/estudiantes`)
}

export async function createEstudiante({ nombre, rut, correo }: iEstudiante) {
    return await axios.post(`${url}/estudiantes`, {
        nombre,
        rut,
        correo
    },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}
export async function getTareas() {
    return await axios.get(`${url}/tareas`)
}

export async function createTareas({ titulo, descripcion, estudiante,fecha_entrega }: iTarea) {
    return await axios.post(`${url}/tareas`, {
        titulo,
        descripcion,
        estudiante,
        fecha_entrega,
    },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}
