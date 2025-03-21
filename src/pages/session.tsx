import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function InterviewSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions: string[] = location.state?.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const [setRecordedChunks] = useState<Blob[]>([]);s
  const [videoURL, setVideoURL] = useState<string>("");

  useEffect(() => {
    if (timeLeft > 0 && currentQuestionIndex < questions.length - 1) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      alert("Interview completed!");
      navigate("/dashboard/candidate");
    }
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mediaRecorderRef.current.ondataavailable = (event) =>
        chunks.push(event.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        // setRecordedChunks(chunks);
        setVideoURL(URL.createObjectURL(blob));
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTimeout(stopRecording, 120000); // Stop after 2 minutes
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaStream?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6  bg-wine  h-screen overflow-y-scroll">
      <Card className="w-[80%] md:w-[500px] p-6 bg-white">
        {currentQuestionIndex === questions.length - 1 ? (
          <div className="flex flex-col items-center">
            <div className="flex justify-end  w-full">
              <Button className="bg-wine text-white " onClick={handleNext}>
                {currentQuestionIndex < questions.length - 1
                  ? "Next"
                  : "Finish"}
              </Button>
            </div>
            <h2 className="text-xl font-bold">Final Question</h2>
            <p className="mt-4">
              Please record a 2-minute introduction about yourself.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <div>
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full mt-4 border rounded"
                />
                <div className="mt-4 flex gap-4">
                  <Button
                    className="bg-wine text-white"
                    onClick={startRecording}
                    disabled={isRecording}>
                    {isRecording ? "Recording..." : "Start Recording"}
                  </Button>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={stopRecording}
                    disabled={!isRecording}>
                    Stop Recording
                  </Button>
                </div>
              </div>
              {videoURL && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Preview:</h3>
                  <video
                    src={videoURL}
                    controls
                    className="w-full mt-2 border rounded"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
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
                {currentQuestionIndex < questions.length - 1
                  ? "Next"
                  : "Finish"}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
