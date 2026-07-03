type Props = {
  results: any[];
};

export default function Results({ results }: Props) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "30px",
        marginTop: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
      }}
    >
      <h2
        style={{
          color: "#1e3a8a",
          marginBottom: "25px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        🎯 Predicted Colleges ({results.length})
      </h2>

      {results.length === 0 ? (
        <div
          style={{
            padding: "45px",
            textAlign: "center",
            border: "2px dashed #cbd5e1",
            borderRadius: "15px",
            color: "#64748b",
            fontSize: "18px",
          }}
        >
          Enter your KCET Rank or College Name and click <b>Predict Colleges</b>.
        </div>
      ) : (
       <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
    gap: "20px",
  }}
>
          {results.map((r, index) => (
            <div
              key={index}
              style={{
  background: "#ffffff",
  border: "1px solid #dbe4f0",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 6px 18px rgba(0,0,0,.08)",
  overflowWrap: "break-word",
}}
            >
              <h3
  style={{
    color: "#2563eb",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "12px",
    lineHeight: "1.4",
  }}
>
  #{index + 1} 🏫{" "}
  {r.collegeName.length > 70
    ? r.collegeName.substring(0, 70) + "..."
    : r.collegeName}
</h3>

              <p
                style={{
                  color: "#111827",
                  fontSize: "17px",
                  margin: "8px 0",
                }}
              >
                🏷️ <b>College Code:</b> {r.collegeCode}
              </p>

              <p
                style={{
                  color: "#111827",
                  fontSize: "17px",
                  margin: "8px 0",
                }}
              >
                🎓 <b>Branch:</b> {r.branch}
              </p>

              <p
                style={{
                  color: "#111827",
                  fontSize: "17px",
                  margin: "8px 0",
                }}
              >
                📊 <b>Cutoff:</b> {r.cutoff}
              </p>

              {"stars" in r && (
                <div
                  style={{
                    marginTop: "15px",
                    fontSize: "26px",
                  }}
                >
                  {"⭐".repeat(r.stars)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}