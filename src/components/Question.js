import Options from "./Options";
function Question({ question, dispatch, correct }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} correct={correct} />
      {correct !== null ? (
        <button onClick={() => dispatch({ type: "next" })}>Next</button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Question;
