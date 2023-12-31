import { useQuiz } from "../context/ReactQuizContext";

function Options() {
  const { questions, dispatch, correct, index } = useQuiz();
  return (
    <div className="options">
      {questions.at(index).options.map((option, index) => (
        <button
          key={option}
          className={
            correct === null
              ? "btn btn-option"
              : correct === index
              ? "btn btn-option correct answer"
              : "btn btn-option wrong"
          }
          disabled={correct !== null}
          onClick={() =>
            dispatch({
              type: "answer",
              payload: {
                answer: index,
              },
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
