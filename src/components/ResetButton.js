import { useQuiz } from "../context/ReactQuizContext";

function ResetButton() {
  const { dispatch } = useQuiz();
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "reset" })}>
      Restart Quiz
    </button>
  );
}

export default ResetButton;
