import React, { useState } from "react";
import { morseList } from "../data/morseCode";
import TextArea from "./TextArea";
import HeadingTextbox from "./HeadingTextbox";
import CopyButton from "./CopyButton";
import MorseSound from "./MorseSound";
import { Link } from "react-router-dom";

function MorseEncoder() {
  //console.log("Component rendered");
  const [text, setText] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1); //for animation

  // ENCODER CONCEPT
  function handleChange(event) {
    setText(event.target.value);
    //console.log(event.target.value);
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

  //DECODER CONCEPT
  function decodeMorse(inputMorse) {
    //console.log(inputMorse);

    //Splitting in array for characters
    const charArray = inputMorse.trim().split("");

    const isValid = charArray.every(
      (char) => char === "." || char === "-" || char === " "
    );

    if (!isValid) {
      //console.log("Enter morse code only..either . or -");
      return "⚠ Invalid Morse Code";
    }

    /*
    It is a conventional rule that between 2 words 3 spaces are given
    */

    //Splitting in array for words
    const words = inputMorse.trim().split("   ");
    const decodedWords = words.map((word) => {
      const letters = word.split(" ");
      //console.log(letters);

      const decodedLetters = letters.map((x) => {
        const found = morseList.find((item) => item.code === x);

        return found ? found.char : "";
      });

      //DECODED LETTERS COMBINING
      //console.log(decodedLetters);
      return decodedLetters.join("");
    });

    //DECODED WORDS COMBINING
    //console.log(decodedWords);
    const output = decodedWords.join("  ");
    return output.toUpperCase();
  }

  function handleDecodeChange(event) {
    setDecodedText(event.target.value);
    //console.log("Decoded text : ", event.target.value);
  }

  const morseEncoded = morseOutput(text);

  return (
    <div className="wrapper-divs">
      <div className="Outer-divs">
        <div className="MorseLogic">
          <HeadingTextbox
            title="What Would Morse Say?"
            subtitle="Type. Blink. Encrypt🕵️‍♂️"
          />

          <form className="MorseForm">
            <TextArea
              placeholder="⫸Type something mysterious..."
              onChange={handleChange}
              value={text}
            />

            <div className="textarea-wrapper">
              <div className="highlight-overlay">
                {morseEncoded.split("").map((char, index) => (
                  <span
                    key={index}
                    className={index === highlightIndex ? "highlight-char" : ""}
                  >
                    {char}
                  </span>
                ))}
              </div>

              <TextArea
                readOnly={true}
                value={morseOutput(text)}
                placeholder="⫸Decode the static…"
                className="textArea textarea-styled"
              />
            </div>

            <div className="button-group">
              <MorseSound text={text} onHighlight={setHighlightIndex} />
              <CopyButton text={morseOutput(text)} />
            </div>
          </form>
        </div>

        <div className="MorseLogic">
          <HeadingTextbox
            title="What Does Morse Mean?"
            subtitle="Dots turn to words🧐"
          />

          <form className="MorseForm">
            <TextArea
              placeholder="⫸ Enter Morse code: .- -... -.-."
              onChange={handleDecodeChange}
              value={decodedText}
            />

            <TextArea
              readOnly={true}
              value={decodeMorse(decodedText)}
              placeholder="⫸ Interpreted message..."
            />

            <CopyButton text={decodeMorse(decodedText)} />
          </form>
        </div>
      </div>

      <Link to="/reference" className="reference-link">
        Morse Reference
      </Link>
    </div>
  );
}

export default MorseEncoder;
