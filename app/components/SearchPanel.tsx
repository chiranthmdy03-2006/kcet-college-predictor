"use client";

import { useEffect, useState } from "react";

export default function SearchPanel({ setResults }: any) {
  const [rank, setRank] = useState("");
  const [collegeSearch, setCollegeSearch] = useState("");
  const [category, setCategory] = useState("GM");
  const [branch, setBranch] = useState("ALL");

 const [colleges, setColleges] = useState<any[]>([]);
const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/data/colleges.json")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);
  

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter") {
    predict();
  }
}
  function predict()  { setLoading(true);
    const output: any[] = [];

    if (collegeSearch.trim() !== "") {
      colleges.forEach((college: any) => {
        if (
          college.college
            .toLowerCase()
            .includes(collegeSearch.toLowerCase())
        ) {
          college.branches.forEach((b: any) => {
            const parts = college.college.split(" ");

output.push({
  collegeCode: parts[0],
  collegeName: parts.slice(1).join(" "),
  branch: b.branch,
  cutoff: b[category],
});
          });
        }
      });

      setResults(output);
      return;
    }

    const r = Number(rank);

    colleges.forEach((college: any) => {
      college.branches.forEach((b: any) => {
        if (branch !== "ALL" && b.branch !== branch) return;

        const cutoff = Number(b[category]);

        if (!isNaN(cutoff) && cutoff >= r) {
          let stars = 5;

          const diff = cutoff - r;

          if (diff < 500) stars = 1;
          else if (diff < 1500) stars = 2;
          else if (diff < 3000) stars = 3;
          else if (diff < 6000) stars = 4;

          const parts = college.college.split(" ");

output.push({
  collegeCode: parts[0],
  collegeName: parts.slice(1).join(" "),
  branch: b.branch,
  cutoff,
  stars,
});
        }
      });
    });

    output.sort((a, b) => a.cutoff - b.cutoff);

// Show only the best 20 colleges
setTimeout(() => {
  setResults(output.slice(0, 20));
  setLoading(false);
}, 400);
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        marginBottom: "30px",
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
        🔍 Search Colleges
      </h2>

      <input
  type="number"
  placeholder="Enter KCET Rank"
  value={rank}
  onChange={(e) => setRank(e.target.value)}
  onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          fontSize: "17px",
          color: "#111827",
          background: "#ffffff",
        }}
      />

      <input
      
  type="text"
  list="college-list"
  placeholder="OR Search College Name"
  value={collegeSearch}
  onChange={(e) => setCollegeSearch(e.target.value)}
onKeyDown={handleKeyDown}
  style={{
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "17px",
    color: "#111827",
    background: "#ffffff",
  }}
/><datalist id="college-list">
  {colleges.map((college: any, index: number) => (
    <option
      key={index}
      value={college.college.split(" ").slice(1).join(" ")}
    />
  ))}
</datalist>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#111827",
            fontSize: "17px",
            fontWeight: "500",
          }}
        >
          <option value="GM">GM</option>
          <option value="1G">1G</option>
          <option value="2AG">2AG</option>
          <option value="2BG">2BG</option>
          <option value="3AG">3AG</option>
          <option value="3BG">3BG</option>
          <option value="SCG">SCG</option>
          <option value="STG">STG</option>
        </select>

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#111827",
            fontSize: "17px",
            fontWeight: "500",
          }}
        >
          <option value="ALL">All Branches</option>
          <option value="COMPUTER SCIENCE AND ENGINEERING">
            Computer Science
          </option>
          <option value="INFORMATION SCIENCE AND ENGINEERING">
            Information Science
          </option>
          <option value="ARTIFICIAL INTELLIGENCE AND DATA SCIENCE">
            AI & Data Science
          </option>
          <option value="ELECTRONICS AND COMMUNICATION ENGG">
            Electronics & Communication
          </option>
          <option value="ELECTRICAL & ELECTRONICS ENGINEERING">
            Electrical & Electronics
          </option>
          <option value="MECHANICAL ENGINEERING">
            Mechanical
          </option>
          <option value="CIVIL ENGINEERING">
            Civil
          </option>
        </select>
      </div>

      <button
        onClick={predict}
        style={{
          width: "100%",
          padding: "16px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "🔄 Searching..." : "🔍 Predict Colleges"}
      </button>
    </div>
  );
}