import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="h-screen w-screen  home relative">
        <div className="flex items-center gap-4 justify-center flex-col absolute h-screen w-full z-4 bg-gray-950/50">
          <h1 className="text-5xl bold text-white heading">
            Welcome To Vector
          </h1>
          <p className="text-2xl text-center text-gray-200 heading-p">
            Your number one application for keeping track of interviewing <br />
            process to help you get the best candidate.{" "}
          </p>
          <Button
            variant="secondary"
            className="bg-gray-300 text-xl p-5 heading-button">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
