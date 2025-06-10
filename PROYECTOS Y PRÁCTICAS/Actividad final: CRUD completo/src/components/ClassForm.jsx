import React, { useState, useEffect } from 'react';
import { deleteClass } from '../api/scheduleApi';

function ClassForm({ initialData, onSave, onClose }) {
  const [form, setForm] = useState({
    day: '',
    hour: '',
    subject: '',
    teacher: '',
    groupName: ''
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };

  const handleDelete = async () => {
    if (form.id && confirm('¿Seguro que quieres eliminar esta clase?')) {
      await deleteClass(form.id);
      onClose(); // Cierra el formulario
    }
  };

  return (
    <div style={modalStyle}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
  <h3>{form.id ? 'Editar Clase' : 'Agregar Clase'}</h3>

  {/* Campos visibles de día y hora (solo lectura) */}
  <input type="text" name="day" value={form.day} disabled />
  <input type="text" name="hour" value={form.hour} disabled />

  <input type="text" name="subject" placeholder="Materia" value={form.subject} onChange={handleChange} required />
  <input type="text" name="teacher" placeholder="Profesor" value={form.teacher} onChange={handleChange} required />

  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <button type="submit">Guardar</button>
    {form.id && <button type="button" onClick={handleDelete}>Eliminar</button>}
    <button type="button" onClick={onClose}>Cancelar</button>
  </div>
</form>

    </div>
  );
}

const modalStyle = {
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  backgroundColor: '#fff',
  padding: '20px',
  border: '2px solid #333',
  zIndex: 1000,
  boxShadow: '0 0 10px rgba(0,0,0,0.5)'
};

export default ClassForm;
