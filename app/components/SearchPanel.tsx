"use client";

import { useEffect, useState } from "react";

export default function SearchPanel({ setResults }: any) {
  const [rank, setRank] = useState("");
  const [collegeSearch, setCollegeSearch] = useState("");
  const [category, setCategory] = useState("GM");
  const [branch, setBranch] = useState("ALL");

  const [colleges, setColleges] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/colleges.json")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);

  function clearAll() {
    setRank("");
    setCollegeSearch("");
    setCategory("GM");
    setBranch("ALL");
    setResults([]);
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      predict();
    }
  }

  function predict() {
    setLoading(true);

    
    const output: any[] = [];
const bestColleges = new Map();
const collegeCount: { [key: string]: number } = {};

    if (collegeSearch.trim() !== "") {
      colleges.forEach((college: any) => {
        if (
          college.college
            .toLowerCase()
            .includes(collegeSearch.toLowerCase())
        ) {
          college.branches.forEach((b: any) => {
           const parts = college.college.split(" ");

const collegeCode = parts[0];

if ((collegeCount[collegeCode] || 0) >= 2) {
  return;
}

collegeCount[collegeCode] = (collegeCount[collegeCode] || 0) + 1;

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
      setLoading(false);
      return;
    }

    const r = Number(rank);

    colleges.forEach((college: any) => {
      college.branches.forEach((b: any) => {
        if (branch !== "ALL" && b.branch !== branch) return;

        const cutoff = Number(b[category]);

       if (
  !isNaN(cutoff) &&
  cutoff >= r - 500 &&
  cutoff <= r + 15000
) {
          let stars = 5;

          const diff = cutoff - r;

          if (diff < 500) stars = 1;
          else if (diff < 1500) stars = 2;
          else if (diff < 3000) stars = 3;
          else if (diff < 6000) stars = 4;

          const parts = college.college.split(" ");

         const difference = Math.abs(cutoff - r);

// Small bonus if cutoff is just above the student's rank
const score =
  cutoff >= r
    ? difference
    : difference + 300;

const item = {
  collegeCode: parts[0],
  collegeName: parts.slice(1).join(" "),
  branch: b.branch,
  cutoff,
  yourRank: r,   // <-- exactly this spelling
  stars,
  difference: score,
};
const collegeCode = parts[0];

if ((collegeCount[collegeCode] || 0) >= 2) {
  return;
}

collegeCount[collegeCode] =
  (collegeCount[collegeCode] || 0) + 1;

const key = collegeCode + "-" + b.branch;

if (
  !bestColleges.has(key) ||
  item.difference < bestColleges.get(key).difference
) {
  bestColleges.set(key, item);
}


        }
      });
    });

   const finalResults = Array.from(bestColleges.values());

finalResults.sort((a: any, b: any) => a.difference - b.difference);

setTimeout(() => {
  setResults(finalResults.slice(0, 40));
  setLoading(false);
}, 400);
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding:
          typeof window !== "undefined" && window.innerWidth < 768
            ? "18px"
            : "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          color: "#1e3a8a",
          marginBottom: "25px",
          fontSize:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "22px"
              : "30px",
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
          padding:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "12px"
              : "15px",
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
    
        placeholder="OR Search College Name"
        value={collegeSearch}
       onChange={(e) => {
  const value = e.target.value;
  setCollegeSearch(value);

  if (value.length < 2) {
    setSuggestions([]);
    return;
  }

  const filtered = colleges
    .filter((c: any) =>
      c.college.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, 6);

  setSuggestions(filtered);
}}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "12px"
              : "15px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          fontSize: "17px",
          color: "#111827",
          background: "#ffffff",
        }}
      />
{suggestions.length > 0 && (
  <div
    style={{
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginTop: "-10px",
      marginBottom: "20px",
      maxHeight: "220px",
      overflowY: "auto",
      boxShadow: "0 6px 18px rgba(0,0,0,.12)",
    }}
  >
    {suggestions.map((college: any, index: number) => (
      <div
        key={index}
        onClick={() => {
          setCollegeSearch(college.college);
          setSuggestions([]);
        }}
        style={{
          padding: "12px",
          cursor: "pointer",
          borderBottom: "1px solid #eee",
        }}
      >
        🏫 {college.college}
      </div>
    ))}
  </div>
)}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding:
              typeof window !== "undefined" && window.innerWidth < 768
                ? "12px"
                : "15px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#111827",
            fontSize: "17px",
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
            padding:
              typeof window !== "undefined" && window.innerWidth < 768
                ? "12px"
                : "15px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#111827",
            fontSize: "17px",
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

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={predict}
          style={{
            flex: 1,
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

        <button
          onClick={clearAll}
          style={{
            padding: "16px 22px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ❌ Clear
        </button>
      </div>
    </div>
  );
}