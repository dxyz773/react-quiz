function Options({ question, dispatch, correct }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
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
