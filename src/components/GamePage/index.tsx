import useCurrentQuestion, { currentQuestionIdAtom } from '../../hooks/useCurrentQuestion';
import AnswerInput from './AnswerInput';
import Keyboard from './Keyboard';
import QuestionHeader from './QuestionHeader';
import useAttachKeyboardHandler from '../../hooks/useAttachKeyboardHandler';
import { FC } from 'react';
import { useSetAtom } from 'jotai';

const StartPage: FC<{ className?: string }> = ({ className }) => {
  const setCurrentQuestion = useSetAtom(currentQuestionIdAtom);

  return (
    <div className={`${className ?? ''} text-center flex flex-col justify-center`}>
      <div className='flex-1 w-40 p-4 mx-auto items-center flex justify-center'>
        <button className='bg-violet-300 text-2xl font-extrabold rounded-lg p-4' onClick={() => setCurrentQuestion(0)}>
          START
        </button>
      </div>
      <div className='flex-1'>
      </div>
    </div>
  )
}

const GamePage: FC<{ className?: string }> = ({ className }) => {
  const { id: questionId } = useCurrentQuestion();

  useAttachKeyboardHandler();

  if (questionId === null) {
    return <StartPage className={className} />
  }

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

export default GamePage;