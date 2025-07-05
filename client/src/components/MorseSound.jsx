import React, { useRef, useState } from "react";
import { morseList } from "../data/morseCode";

function MorseSound({ text,onHighlight }) {
  const [isPlaying, setIsPlaying] = useState(false);

  //stores single AudioContext
  const audioCtxRef = useRef(null);

  function playBeep(duration = 150, frequency = 600, delay = 0) {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const audioCtx = audioCtxRef.current;

    //This generates a tone — like a sine wave beep.
    const oscillator = audioCtx.createOscillator();

    //Controls the volume
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);

    // output to speakers
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    // schedule start
    oscillator.start(audioCtx.currentTime + delay);

    //schedule stop
    oscillator.stop(audioCtx.currentTime + delay + duration / 1000);
  }

  function playMorse(morse) {
    let time = 0; //in seconds

    // to slow down the speed
    const unit = 0.35; // 350ms per dot unit

    for (let i = 0; i < morse.length; i++) {
      const symbol = morse[i];

      // Highlight update
      setTimeout(() => {
        onHighlight?.(i); // << notify parent which char is active
      }, time * 1000);

      if (symbol === ".") {
        playBeep(150, 600, time);
        time += unit + 0.05;
      } else if (symbol === "-") {
        playBeep(450, 600, time);
        time += unit * 3 + 0.05;
      } else if (symbol === " ") {
        time += unit * 2; // small pause between characters
      } else {
        time += unit * 4; // extra pause for unknown symbol
      }
    }

    // Reset isPlaying only after all audio is done
    const totalTime = time * 1000;
    setTimeout(() => {
      setIsPlaying(false);
      onHighlight?.(-1); //reset highlight
    }, totalTime + 100); // Add a buffer
  }

  function morseOutput(inputText) {
    const chars = inputText.toUpperCase().trim().split("");

    return chars
      .map((x) => {
        const found = morseList.find((item) => item.char === x);
        return found ? found.code : "";
      })
      .join(" ");
  }

  function handleSound() {
    //console.log("Text : ", text);
    if (!text) return;

    // Reset any previous AudioContext
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }

    setIsPlaying(true);

    //Function to store morse code in morse without extra spaces
    const morse = morseOutput(text);
    //console.log("Morse Output: ", morse);
    playMorse(morse);

    //console.log("Sound Function Called");
  }
  return (
    <button
      className="copy-btn"
      type="button"
      onClick={handleSound}
      disabled={isPlaying}
    >
      {isPlaying ? "Playing..." : "Play Audio"}
    </button>
  );
}

export default MorseSound;
