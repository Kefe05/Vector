import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";
import InterviewTable from "../../components/reusables/interview-table";

export default function Interview() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState([
    "What is React?",
    "Explain useState hook.",
    "What are props in React?",
    "How does useEffect work?",
    "What is JSX?",
    "Explain the virtual DOM.",
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
      setIsDialogOpen(false);
    }
  };

  const startInterview = () => {
    navigate("/interview-session", { state: { questions } });
  };

  return (
    <div className="flex flex-col gap-6">
      <InterviewTable />
      <Card className="w-[80%] m-auto md:m-0 md:w-[500px] p-2 md:ml-4 relative">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Monday, March 17th 2025</span>
          <span>Closed</span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="sm:text-3xl">Frontend Developer</h2>
            <p>{questions.length} questions</p>
            <Button
              className="bg-wine text-white"
              onClick={() => setIsDialogOpen(true)}>
              Add Questions
            </Button>
          </div>
          <div>
            <Button className="bg-wine text-white" onClick={startInterview}>
              Start Interview
            </Button>
            <div className="absolute -bottom-7 right-0">
              <Button
                className="bg-gray-200 text-black flex items-center gap-2"
                onClick={() => setShowQuestions(!showQuestions)}>
                {showQuestions ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </Button>
              {showQuestions && (
                <ul className="mt-2 p-2 border rounded bg-gray-100">
                  {questions.map((q, index) => (
                    <li key={index} className="py-1 border-b last:border-0">
                      {q}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new question</DialogTitle>
          </DialogHeader>
          <Input
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter question"
          />
          <Button className="bg-wine text-white" onClick={addQuestion}>
            Add Question
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
