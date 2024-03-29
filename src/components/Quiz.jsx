import React, { useState, useEffect } from 'react'
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
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);


  const { question, choices, correctAnswer } = questions[currentQuestion];
  
    const clickAnswer = (answer, index) => {
      if (isAnswered) return;
      setIsAnswered(true);
      setAnswerIndex(index);
      setIsTimeUp(false);
      if (answer === correctAnswer) {
        setAnswer(true);
      } else {
        setAnswer(false);
      }
      clearTimeout(timeoutId); 
      setTimeoutId(setTimeout(handleTimeUp, 5000)); 
    }

    useEffect(() => {
      if (isAnswered && isTimeUp) {
        clickNext(answer);
        setIsTimeUp(false);
      }
    }, [isAnswered, isTimeUp]);

  
  const clickNext = (finalAnswer) => {
    if (!isAnswered || answerIndex === null) return;
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
      setIsAnswered(false); 
    }, 1000));
  };

  const TryAgain =() =>{
    setAnswerIndex(null);
    setResult(resultInitialState);
    setCurrentQuestion(0);
    setShowResult(false);
  }

  const handleTimeUp = () => {
    if (!isAnswered && answerIndex !== null) {
      if (choices[answerIndex] === correctAnswer) {
        setResult((prev) => ({
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1
        }));
      } else {
        setResult((prev) => ({
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1
        }));
      }
      setIsAnswered(true);
    }
    setIsTimeUp(true);
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