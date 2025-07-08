import React, { useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  //console.log("Copied Text : ", text);

  function handleCopy() {
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      //Resets after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    });
    //console.log("hello");
  }
  return (
    <button
      type="button"
      aria-label="Copy encoded Morse code"
      onClick={handleCopy}
      className={`copy-btn ${copied ? "copied" : ""}`}
    >
      {copied ? "✓ Copied!" : "Copy"}
    </button>
  );
}

export default CopyButton;
