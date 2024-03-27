import React, { useState, useEffect } from 'react'

function Results({ totalQuestions, result, TryAgain }) {

  const [name, setName] = useState('');
  const [highScore, setHighScore] = useState([]);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    setHighScore(JSON.parse(localStorage.getItem("highScore")) || []);
  }, [])

  const handleSave = ()=>{
    const score ={
      name,
      score: result.score,
    }

    const newHighScore = [...highScore, score].sort((a,b)=> b.score - a.score)
    setHighScore(newHighScore)
    setShowScore(true);
    localStorage.setItem('highScore', JSON.stringify(newHighScore));
  }

  const handleTryAgain = () => {
    setShowScore(false);
    setHighScore([]);
    TryAgain();
  }

  return (
    <>
    <div className='result'>
      <h3>Result</h3>
      <p>Total Questions:
        <span>{totalQuestions}</span>
      </p>
      <p>Total Score:
        <span>{result.score}</span>
      </p>
      <p>Correct Answers:
        <span>{result.correctAnswers}</span>
      </p>
      <p>Wrong Answers:
        <span>{result.wrongAnswers}</span>
      </p>
      <button onClick={handleTryAgain}>Try Again!!!</button>

      {!showScore ? <div>
      <h3>Enter your name below <br /> to save your score!</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />
      <button onClick={handleSave}>Save</button>
    </div>  :
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        { highScore.map((highScore, index ) => (
          <tr key={`${highScore.score}${highScore.name}${index}`}>
            <td>{index +1}</td>
            <td>{highScore.name}</td>
            <td>{highScore.score}</td>
          </tr>
        ))
          }
      </tbody>
    </table>
    }
    </div>
    </>
  )
}

export default Results