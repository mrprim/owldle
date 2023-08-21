import { FC } from "react";
import useQuestions from "../../hooks/useQuestions";
import PlayAudioButton from "./PlayAudioButton";
import useShowAnswer from "../../hooks/useShowAnswer";
import useCurrentQuestion from "../../hooks/useCurrentQuestion";

const ShowAnswer = () => {
  const { question } = useCurrentQuestion();
  const [showAnswer, setShowAnswer] = useShowAnswer();
  const className = showAnswer ? 'text-violet-600 font-semibold' : ''

  return <div>
    <button className={`${className} mt-4`} onClick={() => setShowAnswer((s) => !s)}>
      {showAnswer ? question.spelling : 'Show answer'}
    </button>
  </div>

}
const QuestionHeader: FC<{ questionId: number }> = ({ questionId }) => {
  const questions = useQuestions();

  return <div>
    <h3 className='mt-3'>#{questionId + 1} of {questions.length} </h3>
    <div>
      <PlayAudioButton questionId={questionId} />
      <ShowAnswer />
    </div>
  </div>
}

export default QuestionHeader;