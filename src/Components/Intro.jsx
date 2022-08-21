import React from "react";
import blob1 from "../images/scrimba-blob1.png";
import blob2 from "../images/scrimba-blob2.png";

function Intro({ handleClick }) {
  return (
    <div className="intro-container">
      <img className="blob" src={blob1} alt="pattern-1" />
      <img className="blob2" src={blob2} alt="pattern-2" />
      <h1>Quizzical</h1>
      <p>Click below to start App 👇🏽</p>
      <button onClick={handleClick} className="btn">
        Start Quiz
      </button>
    </div>
  );
}

export default Intro;
