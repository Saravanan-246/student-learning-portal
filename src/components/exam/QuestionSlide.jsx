import { useState } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function QuestionSlide({ next }) {
  const { darkMode } = useTheme();

  const [selectedLang, setSelectedLang] = useState("javascript");
  const [code, setCode] = useState("// Write your solution here...\n");
  const [output, setOutput] = useState("");

  const question = {
    title: "Two Sum",
    description:
      "Given an array nums and a target value, return the index of two numbers such that they sum to the target.",
    input: "[2,7,11,15], target = 9",
    output: "[0,1]",
    constraints: [
      "➡ 2 <= nums.length <= 10⁴",
      "➡ -10⁹ <= nums[i] <= 10⁹",
      "➡ Each input has EXACTLY one solution",
    ],
  };

  const langOptions = ["javascript", "python", "java", "c++"];

  const runCode = () => {
    setOutput("⚙ Running Code...\n(Compiler Integration Coming Soon)");
  };

  const theme = {
    bg: darkMode ? "#0D1117" : "#F7FAFC",
    card: darkMode ? "#161B22" : "#FFFFFF",
    editor: darkMode ? "#0C1016" : "#1E1E1E",
    text: darkMode ? "#EDEDED" : "#111827",
    sub: darkMode ? "#9CA3AF" : "#4B5563",
    tabActive: "#E63946",
    border: darkMode ? "#2F353D" : "#E2E8F0",
  };

  return (
    <>
      <style>{`
        .layout {
          display: grid;
          grid-template-columns: 45% 55%;
          height: 100vh;
          background: ${theme.bg};
          font-family: 'Inter', sans-serif;
        }

        /* LEFT QUESTION AREA */
        .question-panel {
          padding: 30px;
          overflow-y: auto;
          border-right: 1px solid ${theme.border};
        }

        .title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 12px;
          color: ${theme.text};
        }

        .desc {
          font-size: 15px;
          color: ${theme.sub};
          line-height: 1.6;
        }

        pre {
          background: ${theme.card};
          padding: 12px;
          border-radius: 10px;
          border: 1px solid ${theme.border};
          margin-top: 10px;
          font-size: 14px;
          white-space: pre-wrap;
        }

        /* RIGHT EDITOR AREA */
        .editor-panel {
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 10px;
        }

        .lang-tabs {
          display: flex;
          gap: 10px;
        }

        .lang-btn {
          padding: 8px 14px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid ${theme.border};
          color: ${theme.sub};
          cursor: pointer;
          transition: .3s;
          font-size: 14px;
          font-weight: 500;
        }

        .lang-btn.active {
          background: ${theme.tabActive};
          border-color: ${theme.tabActive};
          color: white;
          transform: scale(1.05);
        }

        .code-box {
          flex: 1;
          background: ${theme.editor};
          color: white;
          padding: 16px;
          border-radius: 10px;
          font-family: 'Fira Code', monospace;
          border: 1px solid ${theme.border};
          resize: none;
          outline: none;
          font-size: 15px;
        }

        .run-btn {
          padding: 12px;
          background: ${theme.tabActive};
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          transition: .3s;
        }

        .run-btn:hover {
          opacity: .85;
        }

        .output {
          background: ${theme.card};
          padding: 14px;
          border-radius: 10px;
          border: 1px solid ${theme.border};
          min-height: 120px;
          font-size: 14px;
          overflow-y: auto;
          color: ${theme.text};
        }

        .next-btn {
          background: #059669;
          padding: 15px;
          width: 100%;
          color: white;
          border-radius: 12px;
          font-size: 18px;
          cursor: pointer;
          font-weight: bold;
          transition: .3s;
          margin-top: 10px;
        }

        .next-btn:hover {
          opacity: .9;
        }
      `}</style>

      <div className="layout">

        {/* LEFT */}
        <div className="question-panel">
          <h2 className="title">🧠 {question.title}</h2>
          <p className="desc">{question.description}</p>

          <h4 style={{ marginTop: "20px", fontWeight: "600" }}>Example</h4>
          <pre>Input: {question.input}</pre>
          <pre>Output: {question.output}</pre>

          <h4 style={{ marginTop: "20px", fontWeight: "600" }}>Constraints</h4>
          <ul style={{ marginTop: "10px", color: theme.sub }}>
            {question.constraints.map((c, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{c}</li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="editor-panel">
          
          {/* Language Tabs */}
          <div className="lang-tabs">
            {langOptions.map(lang => (
              <button
                key={lang}
                className={`lang-btn ${selectedLang === lang ? "active" : ""}`}
                onClick={() => setSelectedLang(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Editor */}
          <textarea
            className="code-box"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {/* Run */}
          <button className="run-btn" onClick={runCode}>▶ Run Code</button>

          {/* Output */}
          <div className="output">
            {output || "💬 Output will appear here..."}
          </div>

          {/* Next */}
          <button className="next-btn" onClick={next}>Next →</button>
        </div>
      </div>
    </>
  );
}
