export default function SubmitSlide({ back }) {
  return (
    <>
      <style>{`
        button {
          margin-top: 20px;
          padding: 15px 40px;
          font-size: 18px;
          border-radius: 10px;
          cursor: pointer;
          transition: .3s;
        }

        .submit {
          background: #0A7D32;
          color: white;
        }

        .back {
          background: #ddd;
          margin-right: 10px;
        }
      `}</style>

      <div style={{ textAlign: "center" }}>
        <h2>🚀 Ready to Submit?</h2>
        <p style={{ marginTop: "10px" }}>
          Review everything before submitting.
        </p>

        <button className="submit">✔ Submit Exam</button>
        <br />
        <button className="back" onClick={back}>⬅ Back</button>
      </div>
    </>
  );
}
