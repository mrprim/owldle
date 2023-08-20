import { FC } from "react";
import useQuestions from "../../hooks/useQuestions";
import PlayAudioButton from "./PlayAudioButton";

const QuestionHeader: FC<{ questionId: number }> = ({ questionId }) => {
  const questions = useQuestions();

  return <div>
    <h3 className='mt-3'>#{questionId + 1} of {questions.length} </h3>
    <PlayAudioButton questionId={questionId} />
  </div>
}

export default QuestionHeader;