import { FC } from "react";
import { observer } from "mobx-react-lite";
import store from "../../store";
import { CapitalizationMode } from "../../store/settingsStore";

interface Props { wordId: number };
interface BoxProps {
  value: string,
  characterId: number,
  word: string,
  isError: boolean,
  isSubmitting: boolean,
  isAnswerShowing: boolean,
  capitalization: CapitalizationMode,
};

const getBorderColor = (value: string, isError: boolean, isSubmitting: boolean) => {
  if (isError) return 'border-rose-500';
  if (isSubmitting) return 'border-emerald-500 dark:border-emerald-100';
  if (value) return 'border-slate-800 dark:border-slate-100';
  return 'border-slate-300 dark:border-slate-600';
};

const getBgColor = (value: string, isError: boolean, incorrect: boolean, isSubmitting: boolean) => {
  if ((isSubmitting || isError) && !value) return 'bg-slate-200 dark:bg-slate-600';
  if (isSubmitting && !isError) return 'bg-emerald-300  dark:bg-emerald-600';
  if (isError && !value) return 'bg-slate-200 dark:bg-slate-600';
  if (isError && incorrect) return 'bg-rose-300 dark:bg-rose-600';
  return '';
};

const Box: FC<BoxProps> = ({ value, characterId, word, isError, isSubmitting, isAnswerShowing, capitalization }) => {
  const incorrect = word[characterId] !== value;
  const label = isAnswerShowing && !value ? word?.[characterId] ?? '' : value

  const borderColorName = getBorderColor(value, isError, isSubmitting);

  const bgColor = getBgColor(value, isError, incorrect, isSubmitting)


  const letterColor = (isAnswerShowing && !value) ? 'text-slate-300 dark:text-slate-500' : '';

  return <div className={`
    border-2 ${borderColorName} ${bgColor} ${letterColor} ${capitalization}
    w-8 md:w-14 h-8 md:h-14
    mx-px md:mx-2
    inline-flex items-center align-middle
    font-sans
    text-xl md:text-3xl
    text-center`}>
    <p className="flex-grow font-bold">
      {label}
    </p>
  </div>
}

const AnswerInput: FC<Props> = observer(({ wordId = 0 }) => {
  const { maxCharacters, capitalization } = store.settingsStore.settings;
  const value = store.gameStateStore.answer;
  const word = store.wordListStore.getWord(wordId)?.spelling ?? '';
  const arrayOfCharacterIds = [...Array(maxCharacters).keys()];

  return <div className='mx-auto my-4'>
    <div className='my-2' onKeyDown={(e) => alert(e.key)}>
      {arrayOfCharacterIds.map((i) => (
        <Box
          key={wordId + '.' + i}
          value={value?.[i] ?? ''}
          characterId={i} word={word}
          isError={store.gameStateStore.isError}
          isSubmitting={store.gameStateStore.isSubmitting}
          isAnswerShowing={store.gameStateStore.isAnswerShowing}
          capitalization={capitalization} />
      ))}
    </div>
  </div>
});

export default AnswerInput;