type Props = {
  results: any[];
  searchInfo: {
    rank: string;
    category: string;
    branch: string;
  };
};

export default function Results({
  results,
  searchInfo,
}: Props) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "clamp(18px,4vw,30px)",
        marginTop: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
      }}
    >
      <h2
        style={{
          color: "#1e3a8a",
          marginBottom: "25px",
          fontSize: "clamp(22px,5vw,30px)",
          fontWeight: "bold",
        }}
      >
        🎯 Predicted Colleges ({results.length})
      </h2><p
  style={{
    color: "#64748b",
    marginBottom: "20px",
    fontSize: "15px",
  }}
>
  Showing the <b>{results.length}</b> closest colleges based on your KCET rank.
</p>

      {results.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            border: "2px dashed #cbd5e1",
            borderRadius: "15px",
            color: "#64748b",
            fontSize: "17px",
          }}
        >
          Enter your KCET Rank or College Name and click
          <br />
          <b>Predict Colleges</b>.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "18px",
          }}
        >
          {results.map((r, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                border: "1px solid #dbe4f0",
                borderRadius: "18px",
                padding: "18px",
                boxShadow: "0 6px 18px rgba(0,0,0,.08)",
              }}
            >
              <h3
                style={{
                  color: "#2563eb",
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: "1.4",
                  marginBottom: "15px",
                  wordBreak: "break-word",
                }}
              >
                #{index + 1} 🏫{" "}
                {r.collegeName.length > 70
                  ? r.collegeName.substring(0, 70) + "..."
                  : r.collegeName}
              </h3>

              <p
                style={{
                  margin: "8px 0",
                  fontSize: "16px",
                  color: "#111827",
                }}
              >
                🏷️ <b>College Code:</b> {r.collegeCode}
                <p
  style={{
    margin: "8px 0",
    fontSize: "16px",
    color: "#111827",
  }}
>
  👤 <b>Your Rank:</b> {r.yourRank}
</p>
              </p>

             <p
  style={{
    margin: "8px 0",
    fontSize: "16px",
    color: "#111827",
  }}
>
  🎯 <b>Cutoff Rank:</b> {r.cutoff}
</p>

             <p
  style={{
    margin: "8px 0",
    fontSize: "16px",
    color: "#2563eb",
    fontWeight: "bold",
  }}
>
  📈 Difference: {r.difference > 0 ? "+" : ""}
  {r.difference}
</p>
              {"stars" in r && (
                <div
                  style={{
                    marginTop: "15px",
                    fontSize: "24px",
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