type Props = {
  results: any[];
  searchInfo: {
    rank: string;
    category: string;
    branch: string;
  };
};

export default function Results({ results }: Props) {
  const collegeSearch =
    results.length > 0 && results[0].isCollegeSearch;
    


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
        {collegeSearch
          ? `🏫 ${results[0]?.collegeName}`
          : `🎯 Predicted Colleges (${results.length})`}
      </h2>

      {results.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            border: "2px dashed #cbd5e1",
            borderRadius: "15px",
            color: "#64748b",
          }}
        >
          Enter your KCET Rank or College Name.
        </div>
      ) : collegeSearch ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
         <thead>
  <tr>
    <th
      style={{
        textAlign: "left",
        padding: "12px",
        color: "#111827",
        fontWeight: "700",
        fontSize: "16px",
      }}
    >
      🌿 Branch
    </th>

    <th
      style={{
        textAlign: "left",
        padding: "12px",
        color: "#111827",
        fontWeight: "700",
        fontSize: "16px",
      }}
    >
      🎯 Cutoff
    </th>
  </tr>
</thead>

          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: "12px",
                    borderTop: "1px solid #eee",
                    color: "#111827",
                    fontWeight: 600,
                  }}
                >
                  {r.branch}
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderTop: "1px solid #eee",
                    color: "#2563eb",
                    fontWeight: "bold",
                  }}
                >
                  {r.cutoff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                background: "#fff",
                border: "1px solid #dbe4f0",
                borderRadius: "18px",
                padding: "18px",
                boxShadow: "0 6px 18px rgba(0,0,0,.08)",
              }}
            >
              <h3
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                }}
              >
                #{index + 1} 🏫 {r.collegeName}
              </h3>

              <p style={{ color: "#111827", fontWeight: 500 }}>
  🏷️ <b>College Code:</b> {r.collegeCode}
</p>

<p style={{ color: "#111827", fontWeight: 500 }}>
  🌿 <b>Branch:</b> {r.branch}
</p>

<p style={{ color: "#111827", fontWeight: 500 }}>
  👤 <b>Your Rank:</b> {r.yourRank}
</p>

<p style={{ color: "#16a34a", fontWeight: 600 }}>
  🎯 <b>Cutoff:</b> {r.cutoff}
</p>

<p style={{ color: "#ea580c", fontWeight: 600 }}>
  📈 <b>Difference:</b> {r.difference}
</p>
              {"stars" in r && (
                <div style={{ fontSize: "24px" }}>
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