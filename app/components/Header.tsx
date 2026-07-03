export default function Header() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
        color: "white",
        borderRadius: "20px",
        padding: "40px",
        textAlign: "center",
        boxShadow: "0 15px 35px rgba(0,0,0,.25)",
        marginBottom: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "46px",
          margin: 0,
          fontWeight: "bold",
        }}
      >
        🎓 KCET College Predictor
      </h1>

      <p
        style={{
          fontSize: "19px",
          marginTop: "15px",
          opacity: 0.95,
        }}
      >
        Find the Best Engineering Colleges using 2025 KCET Cutoffs
      </p>

      <div
        style={{
          marginTop: "25px",
          display: "inline-block",
          background: "rgba(255,255,255,.15)",
          padding: "10px 20px",
          borderRadius: "999px",
          fontSize: "15px",
        }}
      >
        ❤️ Designed & Developed by <b>Chiranth V</b>
      </div>
    </div>
  );
}