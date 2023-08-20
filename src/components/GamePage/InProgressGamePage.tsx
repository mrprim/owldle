import { FC } from 'react';
import useAttachKeyboardHandler from '../../hooks/useAttachKeyboardHandler';
import useCurrentQuestion from '../../hooks/useCurrentQuestion';
import AnswerInput from './AnswerInput';
import Keyboard from './Keyboard';
import QuestionHeader from './QuestionHeader';

const InProgressGamePage: FC<{ className?: string }> = ({ className }) => {
  const { id: questionId } = useCurrentQuestion();

  useAttachKeyboardHandler();

  if (questionId === null) return null;

  return (
    <div className={`${className ?? ''} text-center flex flex-col justify-between`}>
      <div className='flex-0'>

      </div>

      <div className="flex-0" >
        <QuestionHeader questionId={questionId} />
        < AnswerInput questionId={questionId} />
      </div>

      <div className="flex-0" >
        <Keyboard />
      </div>
    </div >
  )

}

export default InProgressGamePage;