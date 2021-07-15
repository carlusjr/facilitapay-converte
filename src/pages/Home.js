import "../styles/global.css";
import { Link } from "react-router-dom";

export default function Home() {  
  return (
    <div className="app">

      <div className="title">
        <h1>Welcome to the</h1>
        <h1>Trivia Challenge!</h1>
      </div>

      <div>        
        <h2>You will be presented</h2>
        <h2>with 10 True or False</h2>       
        <h2>questions.</h2>        
      </div>

      <h2>Can you score 100%?</h2>
      
      <div className="button">
        <Link to="/quiz">
          BEGIN        
        </Link>
      </div>
    </div>
  )  
}

