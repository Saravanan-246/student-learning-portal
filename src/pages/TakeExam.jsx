import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { user } = useAuth();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem("exams") || "[]");
    const match = storedExams.find((e) => e.id === id);
    setExam(match);
  }, [id]);

  const saveAnswer = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const submitExam = () => {
    const responses = JSON.parse(localStorage.getItem("responses") || "[]");

    const entry = {
      student: user.email,
      examId: id,
      answers,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("responses", JSON.stringify([...responses, entry]));

    navigate("/results");
  };

  if (!exam)
    return <p className="p-10 text-gray-500">Loading exam...</p>;

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? "bg-[#0D1117] text-white" : "bg-[#FAFBFC] text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-semibold">{exam.title}</h1>
      <p className="opacity-70 mt-1">{exam.questions?.length} Questions</p>

      <div className="mt-8 space-y-6 max-w-2xl">
        {exam.questions.map((q, index) => (
          <div
            key={q.id}
            className={`p-5 rounded-xl border shadow ${
              darkMode ? "bg-[#161B22] border-[#30363D]" : "bg-white border-gray-200"
            }`}
          >
            <p className="font-medium mb-3">
              {index + 1}. {q.question}
            </p>

            <div className="grid gap-2 mt-3">
              {q.options.map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => saveAnswer(q.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={submitExam}
        className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
      >
        Submit Exam
      </button>
    </div>
  );
}
