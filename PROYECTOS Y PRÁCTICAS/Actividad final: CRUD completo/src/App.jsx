import { useEffect, useState } from 'react';
import { getLibros, createLibro, updateLibro, deleteLibro } from './api/bibliotecaApi';

function App() {
  const [libros, setLibros] = useState([]);
  const [form, setForm] = useState({ alumno: "", titulo: "", autor: "", grupo: "" });
  const [reload, setReload] = useState(false);

  // Cargar datos desde el backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getLibros();
        console.log("📦 Datos obtenidos del backend:", data);
        setLibros(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    loadData();
  }, [reload]);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar libro (crear o actualizar)
  const handleSave = async () => {
    if (!form.alumno || !form.titulo || !form.autor || !form.grupo) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    
    try {
      if (form.id) {
        await updateLibro(form.id, form);
      } else {
        await createLibro(form);
      }
      setReload(!reload);
      setForm({ alumno: "", titulo: "", autor: "", grupo: "" }); // Limpiar formulario
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Eliminar un libro
  const handleDelete = async (id) => {
    try {
      await deleteLibro(id);
      setReload(!reload);
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  // Cargar datos en el formulario para edición
  const handleEdit = (libro) => {
    setForm(libro);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>Biblioteca Escolar</h1>

      <div style={{ marginBottom: '20px' }}>
        <input type="text" name="alumno" placeholder="Nombre del alumno" value={form.alumno} onChange={handleChange} />
        <input type="text" name="titulo" placeholder="Título del libro" value={form.titulo} onChange={handleChange} />
        <input type="text" name="autor" placeholder="Autor del libro" value={form.autor} onChange={handleChange} />
        <input type="text" name="grupo" placeholder="Grupo" value={form.grupo} onChange={handleChange} />
        <button onClick={handleSave}>{form.id ? "Actualizar" : "Registrar"}</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {libros.length > 0 ? (
          libros.map((libro) => (
            <li key={libro.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
              <strong>{libro.titulo}</strong> - {libro.autor} (Alumno: {libro.alumno} - Grupo: {libro.grupo})
              <button onClick={() => handleEdit(libro)}>Editar</button>
              <button onClick={() => handleDelete(libro.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay libros registrados.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
