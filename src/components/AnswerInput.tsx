import { FC } from "react";
import { useAtomValue } from "jotai";
import { answerAtom } from "../hooks/useAnswerActions";
import useCurrentQuestion from "../hooks/useCurrentQuestion";
import { errorStateAtom } from "../hooks/useSubmit";
import useSettings from "../hooks/useSettings";
import setCase from "../utils/setCase";

interface Props { questionId: number };
interface BoxProps { value: string, characterId: number };

const getBorderColor = (value: string, errorState: boolean) => {
  if (errorState) return 'border-red-500';
  if (value) return 'border-gray-800';
  return 'border-gray-300';
};

const getBgColor = (value: string, errorState: boolean, incorrect: boolean) => {
  if (errorState && !value) return 'bg-gray-200';
  if (errorState && incorrect) return 'bg-red-300';
  return '';
};

const Box: FC<BoxProps> = ({ value, characterId }) => {
  const { capitalization } = useSettings();
  const { question } = useCurrentQuestion();
  const errorState = useAtomValue(errorStateAtom);
  const incorrect = question[characterId] !== value;
  const label = setCase(value, capitalization)

  const borderColorName = getBorderColor(value, errorState);

  const bgColor = getBgColor(value, errorState, incorrect)

return <div className={`
  border-2 ${borderColorName} ${bgColor}
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

const AnswerInput: FC<Props> = ({ questionId = 0 }) => {
  const { maxCharacters } = useSettings();
  const { id: currentQuestionId } = useCurrentQuestion();
  const activeAnswer = useAtomValue(answerAtom);
  const value = currentQuestionId === questionId ? activeAnswer : ''

  return <div className='mx-auto my-4'>
    <div className='my-2' onKeyDown={(e) => alert(e.key)}>
      {[...Array(maxCharacters).keys()].map((i) => <Box key={questionId + '.' + i} value={value?.[i] ?? ''} characterId={i} />)}
    </div>
  </div>
}

export default AnswerInput;