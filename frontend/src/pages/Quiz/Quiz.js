// Quiz.js
import React, { useState, useEffect } from "react";
import "./Quiz.css"; // Import the CSS file
import Questions from './qns'
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";

export const Quiz = () => {
  //   const initialQuestions = [
  //     {
  //       question: "What is the capital of France?",
  //       options: ["Berlin", "Paris", "Madrid"],
  //       correctOption: "Paris",
  //     },
  //     {
  //       question: "Which planet is known as the Red Planet?",
  //       options: ["Mars", "Jupiter", "Venus"],
  //       correctOption: "Mars",
  //     },
  //     // Add more questions as needed
  //   ];
  // console.log(Questions)
  const [questions, setQuestions] = useState(Questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showStartButton, setShowStartButton] = useState(true);

  useEffect(() => {
    if (timer > 0 && !quizCompleted && !loading) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (timer === 0 && !quizCompleted) {
      handleNextQuestion();
    }
  }, [timer, quizCompleted, loading]);

  const handleOptionClick = (option) => {
    if (selectedOption === null) {
      setSelectedOption(option);

      // Check if the selected option is correct
      if (option === questions[currentQuestion]?.correctOption) {
        setScore(score + 1);
        setShowCorrectAnswer(true);
      }

      // Move to the next question after a brief delay
      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    }
  };

  const handleNextQuestion = () => {
    setShowCorrectAnswer(false);
    setSelectedOption(null);
    setTimer(10);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuestions(Questions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setTimer(10);
    setShowStartButton(true);
  };

  const handleStartQuiz = () => {
    setLoading(false);
    setShowStartButton(false);
  };


  return (<>
  <div className="containerr">
    <h2 className="header">XO-Game</h2>
    <Link to='/bubbleshooter'> <button className="start-button">
          Start Game
        </button></Link>
  </div>
    <div className="containerr">
      <h2 className="header">Trivia Quiz</h2>

      {showStartButton && (
        <button className="start-button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      )}

      {!showStartButton && !quizCompleted && (
        <>
          <p className="question-counter">Question {currentQuestion + 1}/{questions.length}</p>
          <p className="question">{questions[currentQuestion]?.question}</p>

          <ul className="options-list">
            {questions[currentQuestion]?.options.map((option, index) => (
              <li
                key={index}
                className={`option ${selectedOption === option ? (showCorrectAnswer ? "correct" : "selected") : ""
                  }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
                {selectedOption === option && showCorrectAnswer && (
                  <span className="emoji correct" role="img" aria-label="Correct">
                    &#x1F338;
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="status-bar">
            <p className="timer">Time Left: {timer}s</p>
            {showCorrectAnswer && !quizCompleted && (
              <p className="status correct">Correct!</p>
            )}
          </div>
        </>
      )}

      {quizCompleted && (
        <>
          <h2 className="quiz-completed">Quiz Completed!</h2>
          <p>Your Score: {score}</p>
          <button className="restart-button" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </>
      )}
    </div>
    </>
  );
};

export default Quiz;
