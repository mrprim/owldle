import { FC, useCallback, useEffect } from 'react'
import AnswerInput from './AnswerInput'
import useAnswerActions from '../useAnswerActions';
import Keyboard from './Keyboard';
import useCurrentQuestion from '../useCurrentQuestion';
import Answered from './Answered';
import useSubmit from '../useSubmit';
import YouWon from './YouWon';
import questions from '../data/words.json'

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
    <div className='text-center'>
      <Answered/>
      <AnswerInput questionId={questionId}/>
      <Keyboard />
    </div>
  )
}

export default App
