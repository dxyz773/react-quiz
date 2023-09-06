import Options from "./Options";

function Question({ question, dispatch, correct }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} correct={correct} />
    </div>
  );
}

export default Question;
