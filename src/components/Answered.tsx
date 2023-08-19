import { FC } from "react";
import useCurrentQuestion from "../useCurrentQuestion";
import questions from '../data/words.json';

const Box: FC<{value: string}> = ({ value }) => {
return <div className={`
  border-2 bg-emerald-300 border-emerald-600
  w-14 h-14 mx-1 text-size-xl
  inline-flex items-center align-middle
  text-center`}>
    <p className="flex-grow font-bold">
      {value}
    </p>
</div>
}

const Word: FC<{value: string}> = ({ value }) =>
  <div className='my-2'>
    {value.split('').map((char) => <Box key={char} value={char} />)}
  </div>

const Answered: FC = () => {
  const { id: questionId } = useCurrentQuestion();
  const answered = questions.slice(0, questionId);

  return (
    <>
    {answered.map((a) => <Word key={a} value={a}/>)}
    </>
  )
}

export default Answered;