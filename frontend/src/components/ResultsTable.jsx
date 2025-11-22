import React from "react";
import "../App.css";

function ResultsTable({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Rule</th>
          <th>Status</th>
          <th>Evidence</th>
          <th>Reasoning</th>
          <th>Confidence</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, idx) => {
          const statusClass = r.status.toLowerCase() === "pass" ? "pass" : "fail";
          const rowClass = statusClass === "pass" ? "pass-row" : "fail-row";

          return (
            <tr key={idx} className={rowClass}>
              <td>{r.rule}</td>
              <td className={statusClass}>{r.status}</td>
              <td>{r.evidence}</td>
              <td>{r.reasoning}</td>
              <td>{r.confidence}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ResultsTable;
