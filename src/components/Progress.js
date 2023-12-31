import { useQuiz } from "../context/ReactQuizContext";

function Progress() {
  const { numQuestions, index, totalPossiblePoints, points, correct } =
    useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(correct !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;
