import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ResultDisplay from "./ResultDisplay";

function App() {
  const [original, setOriginal] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: 30 }}>
      <h1>Adversarial AI Security Toolkit</h1>
      <ImageUpload
        setOriginal={setOriginal}
        setResult={setResult}
      />
      {result && (
        <ResultDisplay
          original={original}
          result={result}
        />
      )}
    </div>
  );
}

export default App;
