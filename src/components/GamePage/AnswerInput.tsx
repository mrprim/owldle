import { FC } from "react";
import { useAtomValue } from "jotai";
import { answerAtom } from "../../hooks/useAnswerActions";
import { errorStateAtom, isSubmittingAtom } from "../../hooks/useSubmit";
import useSettings from "../../hooks/useSettings";
import setCase from "../../utils/setCase";
import useShowAnswer from "../../hooks/useShowAnswer";
import { observer } from "mobx-react-lite";
import store from "../../store";

interface Props { questionId: number };
interface BoxProps { value: string, characterId: number, word: string };

const getBorderColor = (value: string, errorState: boolean) => {
  if (errorState) return 'border-red-500';
  if (value) return 'border-gray-800';
  return 'border-gray-300';
};

const getBgColor = (value: string, errorState: boolean, incorrect: boolean, isSubmitting: boolean) => {
  if (isSubmitting && !errorState) return 'bg-emerald-300';
  if (errorState && !value) return 'bg-gray-200';
  if (errorState && incorrect) return 'bg-red-300';
  return '';
};

const Box: FC<BoxProps> = ({ value, characterId, word }) => {
  const [showAnswer] = useShowAnswer();
  const { capitalization } = useSettings();
  const errorState = useAtomValue(errorStateAtom);
  const incorrect = word[characterId] !== value;
  const label = setCase(showAnswer && !value ? word?.[characterId] ?? '' : value, capitalization)
  const isSubmitting = useAtomValue(isSubmittingAtom);

  const borderColorName = getBorderColor(value, errorState);

  const bgColor = getBgColor(value, errorState, incorrect, isSubmitting)


  const letterColor = (showAnswer && !value) ? 'text-gray-300' : 'text-black';

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

const AnswerInput: FC<Props> = observer(({ questionId = 0 }) => {
  const { maxCharacters } = useSettings();
  const value = useAtomValue(answerAtom);
  const word = store.getQuestion(questionId)?.spelling ?? '';

  return <div className='mx-auto my-4'>
    <div className='my-2' onKeyDown={(e) => alert(e.key)}>
      {[...Array(maxCharacters).keys()].map((i) => <Box key={questionId + '.' + i} value={value?.[i] ?? ''} characterId={i} word={word} />)}
    </div>
  </div>
});

export default AnswerInput;