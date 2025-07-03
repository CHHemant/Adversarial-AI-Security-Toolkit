import React, { useRef, useState } from "react";

function ImageUpload({ setOriginal, setResult }) {
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClassify = async (file) => {
    setLoading(true);
    setError("");
    setResult(null);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/classify", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult({
        origPreds: data.predictions,
        advPreds: null,
        advImage: null,
      });
    } catch (e) {
      setError("Classification failed.");
    }
    setLoading(false);
  };

  const handleAttack = async (file) => {
    setLoading(true);
    setError("");
    setResult(null);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/attack", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult({
        origPreds: data.original_predictions,
        advPreds: data.adv_predictions,
        advImage: data.adv_image,
      });
    } catch (e) {
      setError("Attack failed.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setOriginal(null);
    setResult(null);
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setOriginal(url);
    handleClassify(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={handleChange}
        disabled={loading}
      />
      <button
        onClick={() => handleAttack(fileInput.current.files[0])}
        disabled={loading || !fileInput.current?.files[0]}
      >
        Attack (Generate Adversarial Example)
      </button>
      {loading && <div>Processing...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default ImageUpload;
