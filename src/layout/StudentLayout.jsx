import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function StudentLayout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition ${
        darkMode ? "bg-[#0D1117] text-white" : "bg-[#F5F6FA] text-gray-900"
      }`}
    >
      <Navbar />
      <main className="p-8 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
