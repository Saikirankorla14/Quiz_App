import React, { useState, useEffect } from "react";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [time, setTime] = useState(10);

  useEffect(() => {
    if (time === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    handleNext();
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setTime(10);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <h2>
        Your Score: {score} / {questions.length}
      </h2>
    );
  }

  return (
    <div>
      <h2>{questions[current].question}</h2>
      <div>⏱️ Time Left: {time}s</div>
      {questions[current].options.map((opt) => (
        <button
          key={opt}
          onClick={() => handleAnswer(opt)}
          style={{ display: "block", margin: "10px" }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
