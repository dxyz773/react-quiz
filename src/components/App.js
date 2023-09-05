import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Main from "./Main";

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  correct: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "failedFetch":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
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
          status: "finished",
        };

    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ questions, status, index, correct }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
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
          <Question
            question={questions[index]}
            dispatch={dispatch}
            correct={correct}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
