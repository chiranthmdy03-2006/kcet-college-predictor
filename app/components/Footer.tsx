export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        background: "#0f172a",
        color: "white",
        borderRadius: "20px",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,.2)",
      }}
    >
      <h2
        style={{
          color: "#60a5fa",
          marginBottom: "20px",
        }}
      >
        ❤️ Designed & Developed by Chiranth V
      </h2>

      <p style={{ margin: "10px 0", fontSize: "17px" }}>
        📧 <b>Email:</b>{" "}
        <a
          href="mailto:Chiranthmdy03@gmail.com"
          style={{ color: "#93c5fd", textDecoration: "none" }}
        >
          Chiranthmdy03@gmail.com
        </a>
      </p>

      <p style={{ margin: "10px 0", fontSize: "17px" }}>
        📱 <b>WhatsApp:</b>{" "}
        <a
          href="https://wa.me/916362992018"
          target="_blank"
          style={{ color: "#93c5fd", textDecoration: "none" }}
          rel="noreferrer"
        >
          +91 6362992018
        </a>
      </p>

      <p style={{ margin: "10px 0", fontSize: "17px" }}>
        📸 <b>Instagram:</b>{" "}
        <a
          href="https://www.instagram.com/_chiru_chiranth__?igsh=djJ6b3ZpN2llZ2Zl&utm_source=qr"
          target="_blank"
          style={{ color: "#93c5fd", textDecoration: "none" }}
          rel="noreferrer"
        >
          @_chiru_chiranth__
        </a>
      </p>

      <p style={{ margin: "10px 0", fontSize: "17px" }}>
        💻 <b>GitHub:</b>{" "}
        <a
          href="https://github.com/chiranthmdy03-2006"
          target="_blank"
          style={{ color: "#93c5fd", textDecoration: "none" }}
          rel="noreferrer"
        >
          github.com/chiranthmdy03-2006
        </a>
      </p>

      <hr
        style={{
          margin: "25px 0",
          borderColor: "#334155",
        }}
      />

      <p style={{ color: "#94a3b8" }}>
        © 2026 KCET College Predictor
      </p>

      <p
        style={{
          color: "#64748b",
          fontSize: "14px",
          marginTop: "8px",
        }}
      >
        Built with ❤️ using Next.js & React
      </p>
    </footer>
  );
}