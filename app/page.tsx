"use client";

import { useState } from "react";

import Header from "./components/Header";
import SearchPanel from "./components/SearchPanel";
import Results from "./components/Results";
import Footer from "./components/Footer";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [searchInfo, setSearchInfo] = useState({
  rank: "",
  category: "GM",
  branch: "ALL",
});

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#2563eb)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
width: "100%",
padding: "0 10px",
          margin: "0 auto",
        }}
      >
        <Header />
<SearchPanel
  setResults={setResults}
  setSearchInfo={setSearchInfo}
/>

<Results
  results={results}
  searchInfo={searchInfo}
/>

        <Footer />
      </div>
    </main>
  );
}