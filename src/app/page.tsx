'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useFormik } from "formik";
import { useState } from "react";

export default function Home() {
  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Estudiante', href: '#', current: false },
    { name: 'Tareas', href: '#', current: false },
  ];

  const students: { nombre: string; id: number }[] = [
    {
      nombre: "joel",
      id: 1,
    },
    {
      nombre: "nicolas",
      id: 2,
    }
  ];
  const tasks: { titulo: string; descripcion: string; fecha_entrega: string; id: number; estudianteId: number }[] = [];

  const [tabActivo, setTabActivo] = useState("dashboard");

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const formik = useFormik({
    initialValues: {
      nombre: "",
      rut: "",
      correo: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  const formikTarea = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      fecha_entrega: "",
      prioridad: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <div>
      {/* NAVBAR */}
      <div className="mt-6 flex space-x-4 justify-center">
        <button
          onClick={() => setTabActivo("dashboard")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tabActivo === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setTabActivo("estudiantes")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tabActivo === "estudiantes" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          Estudiantes
        </button>
        <button
          onClick={() => setTabActivo("tareas")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tabActivo === "tareas" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          Tareas
        </button>

      </div>
      {/* TAB CONTENT */}
      <div className="p-6">
        {tabActivo === "dashboard" && (
          <div>
            <h2 className="text-3xl mx-auto mt-20 font-bold h-14 bg-linear-to-r from-cyan-500 to-blue-500 mb-4 rounded-tl-lg rounded-tr-lg">Panel de control</h2>
            <p className="text-xl mx-auto text-gray-700 h-14 bg-linear-to-r from-cyan-500 to-blue-500 mb-8 rounded-bl-lg rounded-br-lg">Gestiona estudiantes y tareas de manera eficiente</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-medium text-gray-900">Alumnos registrados</h3>
                <p className="text-3xl font-bold text-blue-600">{students.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-medium text-gray-900">Tareas creadas</h3>
                <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
              </div>
            </div>
          </div>
        )}

        {tabActivo === "estudiantes" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Estudiantes registrados</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  nombre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ingresa el nombre del alumno"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  rut
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="rut"
                    value={formik.values.rut}
                    onChange={formik.handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="rut del estudiante"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  correo
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="correo"
                    value={formik.values.correo}
                    onChange={formik.handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ej: correo del estudiante"
                    required
                  />
                </div>
              </div>             
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Registrar Alumno
              </button>
            </form>
            {students.length > 0 ? (
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-lg font-medium">{student.nombre}</p>
                    <p className="text-sm text-gray-500">ID: {student.id}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay estudiantes registrados</p>
            )}
          </div>
        )}

        {tabActivo === "tareas" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Tareas creadas</h2>
            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-lg font-medium">{task.titulo}</p>
                    <p className="text-sm text-gray-500">Vence: {task.fecha_entrega}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay tareas creadas</p>
            )}
            <form onSubmit={formikTarea.handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  onChange={formikTarea.handleChange}
                  value={formikTarea.values.titulo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ej: Ensayo sobre Historia"
                  required
                />
              </div>

              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  onChange={formikTarea.handleChange}
                  value={formikTarea.values.descripcion}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe los detalles de la tarea..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fecha_entrega" className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de entrega
                  </label>
                  <div className="relative">
                    <input
                      id="fecha_entrega"
                      name="fecha_entrega"
                      type="date"
                      onChange={formikTarea.handleChange}
                      value={formikTarea.values.fecha_entrega}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridad
                  </label>
                  <div className="relative">
                    <select
                      id="prioridad"
                      name="prioridad"
                      onChange={formikTarea.handleChange}
                      value={formikTarea.values.prioridad}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="alta">Alta</option>
                      <option value="media">Media</option>
                      <option value="baja">Baja</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Crear Tarea
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
