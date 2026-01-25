import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { apiFetch } from "../services/api";
import CompilerSlide from "../components/exam/CompilerSlide";
import "../styles/TakeExam.css";

export default function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* 🔐 AUTH GUARD (JWT) */
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  /* ================= LOAD EXAM ================= */
  useEffect(() => {
    const loadExam = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch(`/exams/${id}`);

        if (!data || !Array.isArray(data.questions)) {
          throw new Error("Invalid exam data");
        }

        setExam(data);

        const saved = JSON.parse(
          localStorage.getItem(`exam_${id}_answers`) || "{}"
        );
        setAnswers(saved);
      } catch (err) {
        console.error("Failed to load exam:", err);

        // 🔐 TOKEN INVALID / EXPIRED
        if (
          err.message?.toLowerCase().includes("unauthorized") ||
          err.message?.toLowerCase().includes("token")
        ) {
          localStorage.removeItem("studentToken");
          navigate("/login", { replace: true });
          return;
        }

        setError("Unable to load exam");
        navigate("/exams", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [id, navigate]);

  /* ================= SAVE ANSWER ================= */
  const saveAnswer = (qIndex, value) => {
    const updated = { ...answers, [qIndex]: value };
    setAnswers(updated);
    localStorage.setItem(`exam_${id}_answers`, JSON.stringify(updated));
  };

  /* ================= SUBMIT ================= */
  const submitExam = async () => {
    try {
      await apiFetch("/responses", {
        method: "POST",
        body: JSON.stringify({
          examId: id,
          answers,
        }),
      });

      localStorage.removeItem(`exam_${id}_answers`);
      navigate("/results");
    } catch (err) {
      if (
        err.message?.toLowerCase().includes("unauthorized") ||
        err.message?.toLowerCase().includes("token")
      ) {
        localStorage.removeItem("studentToken");
        navigate("/login", { replace: true });
        return;
      }

      alert(err.message || "Submission failed");
    }
  };

  /* ===== STATES ===== */
  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading exam...</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  if (!exam) return null;

  const total = exam.questions.length;
  const question = exam.questions[current];
  const answeredCount = Object.keys(answers).length;
  const isLast = current === total - 1;
  const canSubmit = answeredCount === total;

  return (
    <div className={`exam-page ${darkMode ? "dark" : ""}`}>
      {/* ===== HEADER ===== */}
      <div className="exam-header">
        <h1 className="exam-title">{exam.title}</h1>
        <p className="exam-sub">
          Question <strong>{current + 1}</strong> of {total}
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((current + 1) / total) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* ===== QUESTION ===== */}
      <div className="question-list">
        <div className="question-card">
          <p className="question-text">
            <span className="q-no">{current + 1}.</span>{" "}
            {question?.question || "Question missing"}
          </p>

          {question?.type === "code" ? (
            <CompilerSlide
              question={question}
              value={answers[current]}
              onSave={(code) => saveAnswer(current, code)}
              back={() => setCurrent((c) => Math.max(c - 1, 0))}
              next={() =>
                setCurrent((c) => Math.min(c + 1, total - 1))
              }
            />
          ) : (
            <div className="options">
              {(question?.options || []).map((opt, i) => {
                const selected = answers[current] === opt;
                return (
                  <label
                    key={`${current}-${i}`}
                    className={`option ${selected ? "selected" : ""}`}
                    onClick={() => saveAnswer(current, opt)}
                  >
                    <input type="radio" checked={selected} readOnly />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ===== NAV ===== */}
      <div className="exam-nav">
        <button
          className="submit-btn secondary"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          ⬅ Back
        </button>

        {!isLast ? (
          <button
            className="submit-btn"
            onClick={() => setCurrent((c) => c + 1)}
          >
            Save & Next →
          </button>
        ) : (
          <button
            className="submit-btn success"
            disabled={!canSubmit}
            onClick={submitExam}
          >
            Submit Exam
          </button>
        )}
      </div>

      <p className="exam-footer">
        Answered {answeredCount} / {total}
      </p>
    </div>
  );
}
