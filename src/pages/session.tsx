import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function InterviewSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      alert("Interview completed!");
      navigate("/dashboard");
    }
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <Card className="w-[80%] md:w-[500px] p-6">
        <h2 className="text-xl font-bold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="mt-4">{questions[currentQuestionIndex]}</p>
        <textarea
          className="w-full mt-4 p-2 border rounded"
          value={answers[currentQuestionIndex]}
          onChange={handleAnswerChange}
          placeholder="Type your answer here..."
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-bold">Time Left: {timeLeft}s</span>
          <Button className="bg-wine text-white" onClick={handleNext}>
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
