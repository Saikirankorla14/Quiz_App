import React, { useState, useEffect } from "react";
import questions from "./data/questions.json";

export default function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult, setShowResult] = useState(false);

  const current = questions[index];
  const totalTime = 15;

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return; // Stop further timer when time is up
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    if (option === current.answer) {
      setScore((prev) => prev + 1);
    }
    handleNext();
  };

  const handleNext = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setTimeLeft(totalTime);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setScore(0);
    setTimeLeft(totalTime);
    setShowResult(false);
  };

  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl flex flex-col items-center">
        {!showResult ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              {current.question}
            </h2>
            <ul className="w-full space-y-3">
              {current.options.map((option, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleAnswer(option)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>

            {/* Timer Info */}
            <div className="mt-6 text-gray-600 text-sm text-center">
              ⏱ Time Left: {timeLeft}s
            </div>

            {/* Timer Progress Bar */}
            <div className="h-2 w-full mt-2 bg-gray-300 rounded overflow-hidden">
              <div
                className="h-full bg-green-500 rounded transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
            <p className="text-xl mb-6">
              Your score: {score} / {questions.length}
            </p>
            <button
              onClick={handleRestart}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded"
            >
              🔁 Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
