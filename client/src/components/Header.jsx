import React, { useEffect, useState } from "react";

function Header() {
  //default :dark
  const [isLight, setIsLight] = useState(false);

  function handleToggle() {
    setIsLight(!isLight);
    console.log(isLight);
    //console.log("Dark-Light Button Clicked");
  }

  //runs everytime when islight is changed
  useEffect(() => {
    //console.log("Header loaded");
    if (isLight) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isLight]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    //this will trigger the above 
    if (savedTheme === "light") {
      setIsLight(true);
    } else {
      setIsLight(false);
    }
  }, []);

  return (
    <div className="heading-outer-div">
      <img src="/image.png" alt="logo" className="icon" />
      <div className="heading">Morse Forge</div>

      <div className={`toggle-button ${isLight ? "light-active" : ""}`} onClick={handleToggle}>
        <span className="emoji moon">🌙</span>
        <span className="emoji sun">🌞</span>
        <span className="knob" />
      </div>
    </div>
  );
}

export default Header;
