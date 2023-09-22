import { useEffect, useReducer } from "react";
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

// status settings: "loading", "error", "ready", "active", "finished"
const SECONDS_PER_QUESTION = 30;
const initialState = {
  questions: [],

  status: "loading",
  index: 0,
  correct: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "failedFetch":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "answer":
      const question = state.questions.at(state.index);
      const correctAnswer = question.correctOption;
      return {
        ...state,
        correct: correctAnswer,
        points:
          action.payload.answer === correctAnswer
            ? state.points + question.points
            : state.points,
      };
    case "next":
      if (state.index < state.questions.length - 1) {
        return { ...state, index: state.index + 1, correct: null };
      } else
        return {
          ...state,
          status: "finish",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    case "reset":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };

    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [
    { questions, status, index, correct, points, secondsRemaining, highscore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPossiblePoints = questions.reduce(
    (acc, current) => acc + current.points,
    0
  );

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("Unable to fetch data");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "failedFetch" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              totalPossiblePoints={totalPossiblePoints}
              points={points}
              correct={correct}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              correct={correct}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} correct={correct} />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <>
            <FinishScreen
              points={points}
              totalPossiblePoints={totalPossiblePoints}
              highscore={highscore}
            />
            <ResetButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
