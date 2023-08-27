import { FC } from "react";
import PlayAudioButton from "./PlayAudioButton";
import { observer } from "mobx-react-lite";
import store from "../../store";
import { CapitalizationMode } from "../../store/settingsStore";

const ShowAnswer: FC<{ word: string, isAnswerShowing: boolean, capitalization: CapitalizationMode }> = ({ word, isAnswerShowing, capitalization }) => {
  const className = isAnswerShowing ? 'text-violet-600 font-semibold' : ''

  return <div>
    <button className={`${className} ${capitalization} mt-4`} onClick={() => store.gameStateStore.setShowAnswer(!isAnswerShowing)}>
      {isAnswerShowing ? word : 'Show answer'}
    </button>
  </div>
};

const QuestionHeader: FC<{ wordId: number }> = observer(({ wordId }) => {
  const questions = store.wordListStore.getTest()?.words ?? [];
  const capitalization = store.settingsStore.settings.capitalization;

  return <div>
    <h3 className='my-3'>#{wordId + 1} of {questions?.length ?? 0} </h3>
    <div>
      <PlayAudioButton wordId={wordId} />
      <ShowAnswer word={questions[wordId]?.spelling ?? 'MISSING'} isAnswerShowing={store.gameStateStore.isAnswerShowing} capitalization={capitalization} />
    </div>
  </div>
});

export default QuestionHeader;