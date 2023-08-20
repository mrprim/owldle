import { FC } from "react";
import useQuestions from "../../hooks/useQuestions";
import PlayAudioButton from "./PlayAudioButton";
import useShowAnswer from "../../hooks/useShowAnswer";

const QuestionHeader: FC<{ questionId: number }> = ({ questionId }) => {
  const questions = useQuestions();
  const [_, setShowAnswer] = useShowAnswer();

  return <div>
    <h3 className='mt-3'>#{questionId + 1} of {questions.length} </h3>
    <div>
    <PlayAudioButton questionId={questionId} />
    </div>
    <div>
      <button onClick={() => setShowAnswer(true)}>Show Answer</button>
    </div>
  </div>
}

export default QuestionHeader;