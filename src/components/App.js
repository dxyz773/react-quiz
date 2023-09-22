import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Main from "./Main";
import FinishScreen from "./FinishScreen";
import ResetButton from "./ResetButton";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../context/ReactQuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />

            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <>
            <FinishScreen />
            <ResetButton />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
