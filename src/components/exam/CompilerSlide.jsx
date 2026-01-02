export default function CompilerSlide({ next, back }) {
  return (
    <>
      <style>{`
        .grid {
          width: 90%;
          max-width: 900px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        textarea {
          width: 100%;
          height: 350px;
          border-radius: 12px;
          padding: 15px;
          border: 2px solid #ddd;
          font-size: 15px;
          resize: none;
        }

        button {
          margin-top: 20px;
          padding: 15px 35px;
          border-radius: 10px;
          font-size: 18px;
          cursor: pointer;
          transition: .3s;
        }

        .next {
          background: #E63946;
          color: white;
        }

        .back {
          background: #ddd;
          margin-right: 10px;
        }
      `}</style>

      <div className="grid">
        <textarea placeholder="// Code here..."></textarea>

        <textarea placeholder="Output will appear here..." disabled />
      </div>

      <div>
        <button className="back" onClick={back}>⬅ Back</button>
        <button className="next" onClick={next}>Next →</button>
      </div>
    </>
  );
}
