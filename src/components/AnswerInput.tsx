import { FC, useRef } from "react";
import { useAtomValue } from "jotai";
import { answerAtom } from "../useAnswerActions";
import { MAX_CHARACTERS } from "../data/settings";
import useCurrentQuestion from "../useCurrentQuestion";
import { errorStateAtom } from "../useSubmit";
import PlayAudioButton from "./PlayAudioButton";

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
  const { question } = useCurrentQuestion();
  const errorState = useAtomValue(errorStateAtom);
  const incorrect = question[characterId] !== value;

  const borderColorName = getBorderColor(value, errorState);

  const bgColor = getBgColor(value, errorState, incorrect)

return <div className={`
  border-2 ${borderColorName} ${bgColor}
  w-14 h-14 mx-2
  inline-flex items-center align-middle
  text-center`}>
    <p className="flex-grow font-bold">
      {value}
    </p>
</div>
}

const AnswerInput: FC<Props> = ({ questionId = 0 }) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const { id: currentQuestionId } = useCurrentQuestion();
  const activeAnswer = useAtomValue(answerAtom);
  const value = currentQuestionId === questionId ? activeAnswer : ''

  return <div className='mx-auto my-4 font-sans text-3xl' onClick={() => hiddenInputRef.current?.focus()}>
    <div className='my-2' onKeyDown={(e) => alert(e.key)}>
      {[...Array(MAX_CHARACTERS).keys()].map((i) => <Box key={questionId + '.' + i} value={value?.[i] ?? ''} characterId={i} />)}
    </div>
    <input className='display-none' ref={hiddenInputRef} />
    <PlayAudioButton />
  </div>
}

export default AnswerInput;