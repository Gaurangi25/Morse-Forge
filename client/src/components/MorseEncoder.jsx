import React, { useState } from "react";
import { morseList } from "../data/morseCode";
import TextArea from "./TextArea";
import HeadingTextbox from "./HeadingTextbox";

function MorseEncoder() {
  //console.log("Component rendered");
  const [text, setText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
    console.log(event.target.value);
  }

  function morseOutput(inputText) {
    //Convert the character to upper case and split the input text into separate characters

    const chars = inputText.toUpperCase().trim().split("");

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
      <HeadingTextbox
        title="What Would Morse Say?"
        subtitle="Let's Find Out 🕵️‍♂️"
      />

      <form className="EncoderForm">
        <TextArea
          placeholder="⫸ Type something mysterious..."
          onChange={handleChange}
          value={text}
        />

        <TextArea
          readOnly={true}
          value={morseOutput(text)}
          placeholder="⫸ Decode the static…"
        />
      </form>
    </div>
  );
}

export default MorseEncoder;
