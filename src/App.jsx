import { useState, useEffect } from "react";
import "./App.css";
import Intro from "./Components/Intro";
import Questions from "./Components/Questions";
import CheckAnswer from "./Components/CheckAnswer";
import { nanoid } from "nanoid";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [checkBtnOff, setCheckbtnOff] = useState(false);
  const [quizData, setQuizData] = useState([]);

  function handleClick() {
    setIsStarted((prevIsStarted) => !prevIsStarted);
  }

  useEffect(() => {
    async function getData() {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
      );
      let data = await response.json();
      const array = data.results;
      // Modified the incoming data
      let updatedArray = array.map((item) => {
        return {
          ...item,
          question: item.question,
          id: nanoid(),
          correct_answer: [
            {
              id: nanoid(),
              correct_answer: item.correct_answer,
              isSelected: false,
              isCorrect: true,
            },
          ],
          incorrect_answers: item.incorrect_answers.map((inCorrectAns) => {
            return {
              wrongAnswer: inCorrectAns,
              id: nanoid(),
              isSelected: false,
              isCorrect: false,
            };
          }),
        };
      });
      setQuizData(updatedArray);
    }
    getData();
  }, []);

  console.log(quizData);

  // Questions Component
  const quizElements =
    quizData &&
    quizData.map((quiz) => {
      return (
        <Questions
          question={quiz.question}
          correctAnswers={quiz.correct_answer}
          inCorrectAnswers={quiz.incorrect_answers}
          key={quiz.id}
          id={quiz.id}
          inCorrectButtonsBg={inCorrectButtonsBg}
          correctButtonsBg={correctButtonsBg}
        />
      );
    });

  // testing function
  function inCorrectButtonsBg(id) {
    console.log(id);
  }

  // testing function
  function correctButtonsBg(id) {
    // let newArray=[]
    console.log(
      id,
      quizData[0].correct_answer[0].id,
      !quizData[0].correct_answer[0].isSelected
    );
    // setQuizData(prevQuizData=> {
    //   let newArray=[]
    //   return prevQuizData.map((quiz,i)=> {
    //     if(prevQuizData[i].correct_answer[i].id === id){
    //       // ????????? 🤐 problem
    //       newArray.push({...quiz,
    //          prevQuizData[i].correct_answer[i].isSelected : !prevQuizData.correct_answer[i].isSelected })
    //     }else {
    //       newArray.push(quiz)
    //     }
    //       return newArray
    //   })
    // })
  }

  return (
    <div>
      {isStarted === false ? (
        <Intro handleClick={handleClick} />
      ) : (
        <div className="questions-container">{quizElements}</div>
      )}
      {checkBtnOff && <CheckAnswer />}
    </div>
  );
}

export default App;
