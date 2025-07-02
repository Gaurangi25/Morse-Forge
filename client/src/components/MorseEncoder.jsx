import React, { useState } from "react";
import { morseList } from "../data/morseCode";

function MorseEncoder() {
  //console.log("Component rendered");
  const [text, setText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
    console.log(event.target.value);
  }

  function morseOutput(inputText) {
    //Convert the character to upper case and split the input text into separate characters

    const chars = inputText.toUpperCase().split("");

    //Map into each character
    const morseArray = chars.map((x) => {
      const found = morseList.find((item) => item.char === x);
      //console.log(found);

      //return null if char not found in the morseList
      return found ? found.code : "";
    });

    //Join the morse code with spaces
    return morseArray.join(" ");
  }

  return (
    <div className="Encoder">
      <div className="EncoderHeading">
        <h3>What Would Morse Say? </h3>
        <h3 className="typewriter">Let's Find Out 🕵️‍♂️</h3>
      </div>

      <form className="EncoderForm">
        <textarea
          className="EncoderText"
          placeholder="⫸ Type something mysterious..."
          onChange={handleChange}
          value={text}
          rows={5}
        ></textarea>

        <textarea
          readOnly
          className="EncoderText"
          value={morseOutput(text)}
          placeholder="⫸ Decode the static…"
          rows={5}
        ></textarea>
      </form>
    </div>
  );
}

export default MorseEncoder;
