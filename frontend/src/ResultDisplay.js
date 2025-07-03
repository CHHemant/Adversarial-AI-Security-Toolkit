import React from "react";

function PredictionList({ preds }) {
  if (!preds) return null;
  return (
    <ul>
      {preds.map((p, i) => (
        <li key={i}>
          <b>{p.desc}</b> ({(p.prob * 100).toFixed(2)}%)
        </li>
      ))}
    </ul>
  );
}

function ResultDisplay({ original, result }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", gap: 40 }}>
        <div>
          <h3>Original Image</h3>
          <img src={original} alt="original" width={224} height={224} />
          <PredictionList preds={result.origPreds} />
        </div>
        {result.advImage && (
          <div>
            <h3>Adversarial Image</h3>
            <img src={result.advImage} alt="adversarial" width={224} height={224} />
            <PredictionList preds={result.advPreds} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultDisplay;
