import { FC, useCallback, useEffect } from 'react'
import AnswerInput from './AnswerInput'
import useAnswerActions from '../useAnswerActions';
import Keyboard from './Keyboard';
import useCurrentQuestion from '../useCurrentQuestion';
import Answered from './Answered';
import useSubmit from '../useSubmit';
import YouWon from './YouWon';
import questions from '../data/words.json'
import Navbar from './Navbar';

const useAttachKeyboardHandler = () => {
  const submit = useSubmit();
  const { addLetter, removeLetter } = useAnswerActions();

  const handler = useCallback((e: KeyboardEvent): void => {
    if(e.altKey || e.ctrlKey) return;
    if(e.key !== 'Backspace' && e.key !== 'Enter' && !e.key.match(/^[A-Z]$/i)) return;
    if(e.key === 'Backspace') {
      removeLetter();
    } else if (e.key === 'Enter') {
      submit();
    } else {
      addLetter(e.key);
    }
    e.preventDefault();

  }, [removeLetter, addLetter, submit]);

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler);
    }
  }, [handler]);
}

const App: FC = () => {
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
