import React from "react";
import blob1 from "../images/scrimba-blob1.png";

function Questions(props) {
  const correctAnswers = props.correctAnswers;
  const inCorrectAnswers = props.inCorrectAnswers;

  let correctButtons = correctAnswers.map((answer) => {
    return (
      <button
        className="answer-btn"
        key={answer.id}
        onClick={() => props.correctButtonsBg(answer.id)}
      >
        {answer.correct_answer}
      </button>
    );
  });

  let inCorrectButtons = inCorrectAnswers.map((answer) => {
    return (
      <button
        className="answer-btn"
        key={answer.id}
        onClick={() => props.inCorrectButtonsBg(answer.id)}
      >
        {answer.wrongAnswer}
      </button>
    );
  });

  inCorrectButtons.push(correctButtons);

  return (
    <div>
      <div className="questions-wrapper">
        <img src={blob1} alt="pattern-1" className="blob" />
        <p>{props.question}</p>
        <div className="answer-container">{inCorrectButtons}</div>
      </div>
    </div>
  );
}

export default Questions;
