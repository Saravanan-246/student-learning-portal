// DEV MODE API WRAPPER
// If backend is not configured, this will NOT crash the app

const API_BASE = import.meta.env.VITE_API_BASE_URL || null;

export const apiFetch = async (url, options = {}) => {
  if (!API_BASE) {
    throw new Error("API not configured (DEV MODE)");
  }

  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("studentToken");

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.message || "API error");
  }

  return data;
};
