const API_URL = '/api/libros';

export async function getLibros() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createLibro(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateLibro(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteLibro(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function deleteClass(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
