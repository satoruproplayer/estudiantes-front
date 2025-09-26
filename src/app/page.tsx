"use client";

import { Input, Button, Textarea } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { createEstudiante, getEstudiantes } from "./lib/estudiantes-crud";
import { createTarea, getTareas } from "./lib/tareas-crud";

interface Student {
  id: number;
  rut: string;
  nombre: string;
  correo: string;
}

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_entrega: string;
  estudianteId: number;
  estudianteNombre?: string;
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [studentForm, setStudentForm] = useState({
    rut: "",
    nombre: "",
    correo: "",
  });

  const [taskForm, setTaskForm] = useState({
    titulo: "",
    descripcion: "",
    fecha_entrega: "",
    estudianteId: 0,
  });

  const fetchStudents = async () => {
    try {
      const { data } = await getEstudiantes();
      console.log(data)
      setStudents(data || []);
    } catch (err) {
      console.error("Error al cargar estudiantes:", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await getTareas();
      console.log(data)
      setTasks(data || []);
    } catch (err) {
      console.error("Error al cargar tareas:", err)
    }
  }

  useEffect(() => {
    fetchStudents();
    fetchTasks();
  }, []);

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!studentForm.rut || !studentForm.nombre || !studentForm.correo) {
      setError("Todos los campos de estudiante son obligatorios.");
      return;
    }

    try {
      const response = await createEstudiante(studentForm);
      const newStudent = response.data;

      fetchStudents();
      setStudents([...students, newStudent]);
      setStudentForm({ rut: "", nombre: "", correo: "" });
      setSuccess("Estudiante registrado con éxito.");
    } catch (error: any) {
      console.error("Error al crear estudiante:", error);
      const msg = error?.response?.data?.message || "Ocurrió un error.";
      setError(msg);
    }
  };

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { titulo, descripcion, fecha_entrega, estudianteId } = taskForm;

    if (!titulo || !descripcion || !fecha_entrega || !estudianteId) {
      setError("Todos los campos de tarea son obligatorios.");
      return;
    }

    try {
      const response = await createTarea({
        titulo,
        descripcion,
        fecha_entrega,
        estudianteId,
      });

      const savedTask = response.data;

      const selectedStudent = students.find(
        (s) => String(s.id) === String(estudianteId)
      );

      const newTask: Task = {
        ...savedTask,
        estudianteId,
        estudianteNombre: selectedStudent?.nombre || "Desconocido",
      };

      fetchTasks();
      setTasks([...tasks, newTask]);
      setTaskForm({
        titulo: "",
        descripcion: "",
        fecha_entrega: "",
        estudianteId: 0,
      });
      setSuccess("Tarea creada con éxito.");
    } catch (error: any) {
      console.error("Error al crear tarea:", error);
      const msg = error?.response?.data?.message || "Ocurrió un error.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-sm">
            🎓 Gestión Académica
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Administra estudiantes y tareas fácilmente
          </p>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded">
            {success}
          </div>
        )}

        {/* Estudiante Form */}
        <form
          onSubmit={handleStudentSubmit}
          className="mb-12 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-xl p-6 space-y-5"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Registrar Estudiante
          </h2>

          {["rut", "nombre", "correo"].map((field) => (
            <div key={field} className="space-y-1">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                {field === "rut"
                  ? "RUT"
                  : field === "nombre"
                    ? "Nombre Completo"
                    : "Correo Electrónico"}
              </label>
              <Input
                id={field}
                type={field === "correo" ? "email" : "text"}
                placeholder={
                  field === "rut"
                    ? "12.345.678-9"
                    : field === "nombre"
                      ? "Juan Pérez González"
                      : "juan.perez@ejemplo.com"
                }
                value={studentForm[field as keyof typeof studentForm]}
                onChange={(e) =>
                  setStudentForm({
                    ...studentForm,
                    [field]: e.target.value,
                  })
                }
                required
                className="w-full"
              />
            </div>
          ))}

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2 rounded-lg text-sm font-medium"
          >
            Registrar Estudiante
          </Button>
        </form>

        {/* Tarea Form */}
        <form
          onSubmit={handleTaskSubmit}
          className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-xl p-6 space-y-5"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Crear Tarea
          </h2>

          <div className="space-y-1">
            <label htmlFor="titulo" className="text-sm font-medium text-gray-700">
              Título
            </label>
            <Input
              id="titulo"
              type="text"
              placeholder="Ensayo sobre la Historia de Chile"
              value={taskForm.titulo}
              onChange={(e) =>
                setTaskForm({ ...taskForm, titulo: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
              Descripción
            </label>
            <Textarea
              id="descripcion"
              placeholder="Detalles, objetivos y entregables..."
              value={taskForm.descripcion}
              onChange={(e) =>
                setTaskForm({ ...taskForm, descripcion: e.target.value })
              }
              required
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="fecha_entrega" className="text-sm font-medium text-gray-700">
              Fecha de Entrega
            </label>
            <Input
              id="fecha_entrega"
              type="date"
              value={taskForm.fecha_entrega}
              onChange={(e) =>
                setTaskForm({ ...taskForm, fecha_entrega: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="estudiante" className="text-sm font-medium text-gray-700">
              Asignar a Estudiante
            </label>
            <select
              id="estudiante"
              value={taskForm.estudianteId}
              onChange={(e) =>
                setTaskForm({ ...taskForm, estudianteId: Number(e.target.value) })
              }
              required
              disabled={students.length === 0}
              className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${students.length === 0 ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
            >
              <option value="">Selecciona un estudiante</option>
              {students.map((student) =>
                student.id !== undefined ? (
                  <option key={student.id.toString()} value={student.id}>
                    {student.nombre}
                  </option>
                ) : null
              )}

            </select>
          </div>

          <Button
            type="submit"
            disabled={students.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center gap-2 py-2 rounded-lg text-white font-medium"
          >
            <PlusIcon className="w-5 h-5" />
            Crear Tarea
          </Button>

          {students.length === 0 && (
            <p className="text-sm text-center text-amber-600">
              Debes registrar al menos un estudiante primero.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
