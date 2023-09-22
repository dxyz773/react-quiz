function NextButton({ dispatch, correct }) {
  if (correct === null) return null;
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
}

export default NextButton;
