export default function Header() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
        color: "white",
        borderRadius: "20px",
        padding: "clamp(20px, 5vw, 40px)",
        textAlign: "center",
        boxShadow: "0 15px 35px rgba(0,0,0,.25)",
        marginBottom: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(28px, 6vw, 46px)",
          margin: 0,
          fontWeight: "bold",
          lineHeight: 1.2,
        }}
      >
        🎓 KCET College Predictor
      </h1>

      <p
        style={{
          fontSize: "clamp(15px, 3vw, 19px)",
          marginTop: "15px",
          opacity: 0.95,
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.6,
        }}
      >
        Predict Your Best Engineering Colleges using Official 2026 KCET Mock Round Cutoffs
      </p>

      <div
        style={{
          marginTop: "22px",
          display: "inline-block",
          background: "rgba(255,255,255,.18)",
          padding: "10px 20px",
          borderRadius: "999px",
          fontSize: "clamp(13px, 2.5vw, 16px)",
          fontWeight: 600,
        }}
      >
        ❤️ Designed & Developed by <b>Chiranth V</b>
      </div>
    </div>
  );
}