import { FC } from "react"
import { observer } from "mobx-react-lite";
import store from "../../store";
import { CapitalizationMode } from "../../store/settingsStore";

const Word: FC<{ value: string, pronunciation?: string, capitalization: CapitalizationMode }> = ({ value, pronunciation, capitalization }) => {
  return <div className={`my-3 font-bold`} >
    <button className={capitalization} onClick={() => store.speechStore.say(pronunciation ?? value)}>{value}</button>
  </div>
}

const ReviewPage: FC<{ className?: string }> = observer(({ className = '' }) => {
  const wordList = store.gameStateStore.wordList;
  const capitalization = store.settingsStore.settings.capitalization;

  if (!wordList) return null;

  const midwayIndex = Math.ceil(wordList.words.length / 2);

  const firstColumn = [...wordList.words].splice(0, midwayIndex);
  const secondColumn = [...wordList.words].splice(midwayIndex, wordList.words.length);


  return <div className={`${className}`}>
    <div className="text-center font-bold">Week {'#'}{wordList.week}</div>
    <h3 className="text-center font-extrabold text-2xl">{wordList.rule}</h3>
    {wordList.subrule && <div className="max-w-sm mx-auto mt-3">{wordList.subrule}</div>}
    <div className='max-w-sm mx-auto p-5 flex flex-row my-5'>
      <div className='flex-1'>{firstColumn.map((q) => <Word key={q.spelling} value={q.spelling} pronunciation={q.pronunciation} capitalization={capitalization} />)}</div>
      <div className='flex-1'>{secondColumn.map((q) => <Word key={q.spelling} value={q.spelling} pronunciation={q.pronunciation} capitalization={capitalization} />)}</div>
    </div>
    <p className='max-w-sm mx-auto border-2 border-slate-900 dark:border-slate-300 p-2'>{wordList.advice}</p>
  </div>
});

export default ReviewPage;