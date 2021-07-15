import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaCheck, FaWindowClose } from "react-icons/fa";
import "../styles/results.css";

export default function Results() {
  const location = useLocation();
  const history = useHistory();

  if (!location.state) {
    history.push("/");
    return <div>Redirecting...</div>;
  }

  const quiz = location.state.quiz;
  const answer = location.state.answer;
  const score = quiz.filter(
    (item, index) =>
      item.correct_answer.toLowerCase() === answer[index].toString()
  ).length;
  
  function showResult(question, index) {

    const isCorrect = question.correct_answer.toLowerCase() === answer[index].toString();
    const icon = isCorrect ? <FaCheck /> : <FaWindowClose />;
    const number = `(${index + 1})`;

    return (

      <div className="resultItem" key={index}>

        <div className="resultQuestion">
          <div className="resultImage">{icon}</div>
          <p>
            {number} - {question.question}
          </p>
        </div>

        <label>
          <b>Your answer:</b> {answer[index].toString()}
        </label>
        <label>
          <b>Correct:</b> {question.correct_answer.toLowerCase()}
        </label>

      </div>
    );
  }

  return (
    <div className="result">

      <h1>You Scored</h1>
      <h2>{score}/{quiz.length}</h2>

      <div className="detail">
        {quiz.map((question, index) => showResult(question, index))}
      </div>
      
      <div className="button">
        <Link to="/quiz">PLAY AGAIN?</Link>
      </div>

    </div>
  );
}
