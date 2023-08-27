import { FC } from 'react';
import useAttachKeyboardHandler from '../../hooks/useAttachKeyboardHandler';
import AnswerInput from './AnswerInput';
import Keyboard from './Keyboard';
import QuestionHeader from './QuestionHeader';
import { observer } from 'mobx-react-lite';
import store from '../../store';

const InProgressGamePage: FC<{ className?: string }> = observer(({ className }) => {
  const wordId = store.gameStateStore.wordId;
  const wordList = store.gameStateStore.wordList;

  useAttachKeyboardHandler();

  if (wordId === null || !wordList) return null;

  return (
    <div className={`${className ?? ''} text-center flex flex-col justify-between`}>
      <div className='flex-0'>
        <div className="text-center font-bold">Week {'#'}{wordList.week}</div>
        <h3 className="text-center font-extrabold text-2xl">{wordList.rule}</h3>
      </div>

      <div className="flex-0" >
        <QuestionHeader wordId={wordId} />
        < AnswerInput wordId={wordId} />
      </div>

      <div className="flex-0" >
        <Keyboard />
      </div>
    </div >
  )
});

export default InProgressGamePage;