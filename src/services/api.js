const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://classroom-backend-s22x.onrender.com/api";

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("studentToken");

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // ✅ No content
  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {}

  // ❌ Error handling
  if (!res.ok) {
    const error = new Error(
      data?.message || `Request failed with status ${res.status}`
    );
    error.status = res.status;
    throw error;
  }

  return data;
};
