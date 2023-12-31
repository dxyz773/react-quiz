import { useQuiz } from "../context/ReactQuizContext";

function NextButton() {
  const { correct, dispatch } = useQuiz();
  if (correct === null) return null;
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
}

export default NextButton;
