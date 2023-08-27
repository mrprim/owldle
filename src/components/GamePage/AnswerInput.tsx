import { FC } from "react";
import setCase from "../../utils/setCase";
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

const getBorderColor = (value: string, isError: boolean) => {
  if (isError) return 'border-red-500';
  if (value) return 'border-gray-800';
  return 'border-gray-300';
};

const getBgColor = (value: string, isError: boolean, incorrect: boolean, isSubmitting: boolean) => {
  if (isSubmitting && !isError) return 'bg-emerald-300';
  if (isError && !value) return 'bg-gray-200';
  if (isError && incorrect) return 'bg-red-300';
  return '';
};

const Box: FC<BoxProps> = ({ value, characterId, word, isError, isSubmitting, isAnswerShowing, capitalization }) => {
  const incorrect = word[characterId] !== value;
  const label = setCase(isAnswerShowing && !value ? word?.[characterId] ?? '' : value, capitalization)

  const borderColorName = getBorderColor(value, isError);

  const bgColor = getBgColor(value, isError, incorrect, isSubmitting)


  const letterColor = (isAnswerShowing && !value) ? 'text-gray-300' : 'text-black';

  return <div className={`
  border-2 ${borderColorName} ${bgColor} ${letterColor}
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