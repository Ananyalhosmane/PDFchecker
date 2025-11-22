import { useState } from "react";
import axios from "axios";
import ResultsTable from "./components/ResultsTable.jsx";
import "./App.css";

export default function App() {
  const [pdf, setPdf] = useState(null);
  const [rules, setRules] = useState(["", "", ""]);
  const [results, setResults] = useState([]);

  const handleCheck = async () => {
    if (!pdf) return alert("Select a PDF");
    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("rules", JSON.stringify(rules.filter(r => r.trim() !== "")));
    try {
      const res = await axios.post("http://localhost:5000/api/check-pdf", formData);
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
      alert("Error checking PDF");
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#00796b", marginBottom: "30px" }}>
        PDF Checker
      </h1>

      {/* File upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdf(e.target.files[0])}
        style={{ marginBottom: "15px" }}
      />

      {/* Rules input stacked vertically */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
        {rules.map((r, i) => (
          <input
            key={i}
            value={r}
            onChange={(e) => {
              const newRules = [...rules];
              newRules[i] = e.target.value;
              setRules(newRules);
            }}
            placeholder={`Rule ${i + 1}`}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        ))}
      </div>

      {/* Check Document button */}
      <button
        onClick={handleCheck}
        style={{
          backgroundColor: "#00796b",
          color: "white",
          fontWeight: "bold",
          padding: "12px 25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Check Document
      </button>

      {/* Results Table */}
      <ResultsTable results={results} />
    </div>
  );
}



