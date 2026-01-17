const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("studentToken");

  const res = await fetch(`${API_BASE}${url}`, {
    credentials: "include", // matches backend CORS
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // ✅ NO CONTENT
  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch (e) {}

  // ❌ ERROR RESPONSE
  if (!res.ok) {
    const error = new Error(
      data?.message || `Request failed with status ${res.status}`
    );
    error.status = res.status; // 🔥 IMPORTANT
    throw error;
  }

  return data;
};
