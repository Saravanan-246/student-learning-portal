import { useEffect, useState } from "react";

export default function CompilerSlide({ question, value, onSave, next, back }) {
  const [code, setCode] = useState(value || question.starterCode || "");
  const [output, setOutput] = useState("");

  useEffect(() => {
    setCode(value || question.starterCode || "");
  }, [value, question.starterCode]);

  const runCode = () => {
    if (!code.trim()) {
      setOutput("❌ Error: No code written");
      return;
    }

    // TEMP MOCK COMPILER (for testing flow)
    if (code.includes("System.out.println")) {
      setOutput("✅ Program executed successfully\nHello World");
    } else {
      setOutput("❌ Compilation Error: Missing print statement");
    }

    onSave(code); // save code answer
  };

  return (
    <div>
      <textarea
        className="compiler-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="// Write your code here..."
        rows={14}
      />

      <button className="submit-btn" onClick={runCode}>
        Run Code
      </button>

      {output && (
        <pre style={{ marginTop: "16px", opacity: 0.9 }}>
          {output}
        </pre>
      )}

      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <button className="submit-btn" onClick={back}>
          ⬅ Back
        </button>
        <button className="submit-btn" onClick={next}>
          Next →
        </button>
      </div>
    </div>
  );
}
