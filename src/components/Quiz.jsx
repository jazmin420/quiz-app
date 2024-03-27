import React, { useState } from 'react'
import { resultInitialState } from '../constants';
import Timer from './Timer';
import Results from './Results';

function Quiz({ questions}) {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false)
  const [showAnswer, setShowAnswer] = useState(true)
  const [timeoutId, setTimeoutId] = useState(null);
  const [optionClicked, setOptionClicked] = useState(false);


  const { question, choices, correctAnswer } = questions[currentQuestion];
  
  const clickAnswer = (answer, index) => {
    setAnswerIndex(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }
  
  const clickNext = (finalAnswer) => {
    clearTimeout(timeoutId); 
    setAnswerIndex(null);
    setShowAnswer(false);
    setResult((prev) => 
    finalAnswer 
    ?
    {
      ...prev,
      score: prev.score  + 5,
      correctAnswers: prev.correctAnswers+1
    }
    : {
      ...prev,
      wrongAnswers: prev.wrongAnswers + 1
    }
    );

    if (currentQuestion !== questions.length-1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeoutId(setTimeout(() => {
      setShowAnswer(true);
      setOptionClicked(false);
    }));
  };

  const TryAgain =() =>{
    setAnswerIndex(null);
    setResult(resultInitialState);
    setCurrentQuestion(0);
    setShowResult(false);
  }

  const handleTimeUp = () => {
    setAnswer(false)
    clickNext(false)
  }

  return (
    <div className='quiz-container'>
    { !showResult ? (
    <div>
      {showAnswer && <Timer duration = {5} onTimeUp = {handleTimeUp}/>}
      <span className="active-question-no">{currentQuestion +1}</span>
      <span className="total-quesions">/{questions.length}</span>
      <h2>{question}</h2>
      <ul>
      {
  choices.map((answer,index) => (
    <li onClick={() => {clickAnswer(answer, index); setOptionClicked(true);}} key={answer}
    className={answerIndex === index ? (answer === correctAnswer ? 'correct-answer' : 'selected-answer') : (optionClicked && showAnswer && answer === correctAnswer ? 'correct-answer' : null)}
    >
      {answer}
    </li>
  ))
}
      </ul>
      <div className="footer">
        <button onClick={()=>clickNext(answer)} disabled ={answerIndex === null}>
          {currentQuestion === questions.length -1 ? "Finish" : "Next"}
        </button>
      </div>

    </div> )   
      : 
    <Results result={result} TryAgain={TryAgain} totalQuestions={questions.length} />
    }  
    </div>
  )
}

export default Quiz