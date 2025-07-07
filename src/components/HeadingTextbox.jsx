import React from "react";

function HeadingTextbox({ title, subtitle }) {
  return (
    <div className="MorseHeading">
      <h3>{title}</h3>
      <h3 className="typewriter">{subtitle}</h3>
    </div>
  );
}

export default HeadingTextbox;
