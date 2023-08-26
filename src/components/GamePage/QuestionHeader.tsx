import { FC } from "react";
import PlayAudioButton from "./PlayAudioButton";
import useShowAnswer from "../../hooks/useShowAnswer";
import { observer } from "mobx-react-lite";
import store from "../../store";

const ShowAnswer: FC<{ word: string }> = ({ word }) => {
  const [showAnswer, setShowAnswer] = useShowAnswer();
  const className = showAnswer ? 'text-violet-600 font-semibold' : ''

  return <div>
    <button className={`${className} mt-4`} onClick={() => setShowAnswer((s) => !s)}>
      {showAnswer ? word : 'Show answer'}
    </button>
  </div>
};

const QuestionHeader: FC<{ wordId: number }> = observer(({ wordId }) => {
  const questions = store.wordListStore.getTest()?.words ?? [];

  return <div>
    <h3 className='mt-3'>#{wordId + 1} of {questions?.length ?? 0} </h3>
    <div>
      <PlayAudioButton wordId={wordId} />
      <ShowAnswer word={questions[wordId]?.spelling ?? 'MISSING'} />
    </div>
  </div>
});

export default QuestionHeader;