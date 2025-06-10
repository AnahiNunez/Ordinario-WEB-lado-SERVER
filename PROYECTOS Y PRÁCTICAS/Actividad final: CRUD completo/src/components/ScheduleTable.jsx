import React, { useState } from 'react';
import ClassForm from './ClassForm';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const hours = [1, 2, 3, 4, 5, 6];

function ScheduleTable({ schedule, onSave }) {
  const [editing, setEditing] = useState(null);

  console.log("🧪 Datos que llegan al componente ScheduleTable:", schedule);

  const getClass = (day, hour) => {
    return schedule.find((c) =>
      c.day.toLowerCase() === day.toLowerCase() &&
      Number(c.hour) === Number(hour)
    );
  };

  const handleClickCell = (day, hour) => {
    const clase = getClass(day, hour);
    setEditing({
      id: clase?.id,
      day,
      hour,
      subject: clase?.subject || '',
      teacher: clase?.teacher || '',
      groupName: clase?.groupName || 'Grupo A - Semestre 2024-1'
    });
  };

  return (
    <>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Hora</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td><strong>{hour}</strong></td>
              {days.map((day) => {
                const clase = getClass(day, hour);
                return (
                  <td key={`${day}-${hour}`} onClick={() => handleClickCell(day, hour)} style={{ cursor: 'pointer' }}>
                    {clase ? (
                      <>
                        <div><strong>{clase.subject}</strong></div>
                        <div>{clase.teacher}</div>
                      </>
                    ) : (
                      <em>Vacío</em>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <ClassForm
          initialData={editing}
          onSave={onSave}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default ScheduleTable;
