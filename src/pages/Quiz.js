import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/global.css";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState([]);
  const history = useHistory();
  const btnBack = "< Back";
  const btnContinue = "Continue >";

  const fetchQuestions = async () => {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
    );
    const quizJSON = await response.json();
    setQuiz(quizJSON.results);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {

    // The answers already done are reflected on radio buttons
    const radioFalse = document.getElementById("radioFalseId");    
    if (radioFalse) {
      document.getElementById("radioTrueId").checked = false;
      document.getElementById("radioFalseId").checked = false;      
      if (answer[index]) {
        document.getElementById("radioTrueId").checked = true;    
      } else {
        radioFalse.checked = (answer[index] === undefined ? false : true);
      }      
    }  

  }, [answer, index]);

  // Back button click  
  const handleBackClick = () => {
    if (index <= 0) {
      history.push("/");
      return;
    }
    setIndex(index - 1);
  };

  // Continue button click  
  const handleContinueClick = () => {
    if (answer[index] === undefined) {
      alert("You must answer True or False!");
      return;
    }
    if (index < quiz.length) {
       setIndex(index + 1);
    } 

    // in the end of questions redirect to show results 
    if (index+1 >= quiz.length && quiz.length > 0) {    
      history.push({
        pathname: "/results",
        state: { quiz, answer } 
      });
      return;
    } 
  };

  // The user answer is stored in array
  const handleSetAnswer = (value) => {
    let oldAnswer = answer;
    if (typeof oldAnswer[index] === undefined) {
      oldAnswer.push(value);
    } else {
      oldAnswer[index] = value;
    }
    setAnswer(oldAnswer);    
  };

  // Show loading... while take questions at endpoint
  if (quiz.length <= 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">

      <div className="title">
        <h1>{quiz[index].category}</h1>
      </div>

      <div className="question">
        <h2>{quiz[index].question}</h2>
      </div>

      <h3>{`${index + 1} of ${quiz.length}`}</h3>

      <div className="answer">
        <h3>Your answer is:</h3>        
        <input
          type="radio"
          id="radioTrueId"
          name="radioAnswer"
          value="true"
          onChange={() => handleSetAnswer(true)}          
        />
        <label htmlFor="radioTrueId">True</label>        
        <input
          type="radio"
          id="radioFalseId"
          name="radioAnswer"
          value="false"
          onChange={() => handleSetAnswer(false)}         
        />
        <label htmlFor="radioFalseId">False</label>
      </div>

      <div className="navigator">
        <button onClick={handleBackClick}>{btnBack}</button>
        <button onClick={handleContinueClick}>{btnContinue}</button>
      </div>

    </div>
  );
}


