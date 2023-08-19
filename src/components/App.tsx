import { FC } from 'react';
import useAttachKeyboardHandler from '../hooks/useAttachKeyboardHandler';
import useCurrentQuestion from '../hooks/useCurrentQuestion';
import AnswerInput from './AnswerInput';
import Answered from './Answered';
import Keyboard from './Keyboard';
import Navbar from './Navbar';
import YouWon from './YouWon';
import useQuestions from '../hooks/useQuestions';
import QuestionHeader from './QuestionHeader';

const App: FC = () => {
  const questions = useQuestions();
  const { id: questionId } = useCurrentQuestion();
  useAttachKeyboardHandler();

  if (questionId >= questions.length) return <YouWon />

  return (
    <>
      <Navbar />
      <div className='text-center flex flex-col justify-between'>
        <div className="flex-0">
          <Answered />
        </div>
        <div className="flex-0">
          <QuestionHeader questionId={questionId} />
          <AnswerInput questionId={questionId} />
        </div>
        <div className="flex-0">
          <Keyboard />
        </div>
      </div>
    </>
  )
}

export default App
