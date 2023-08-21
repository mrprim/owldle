import { FC } from "react"
import useTest from "../../hooks/useTest";
import useSpeech from "../../hooks/useSpeech";

const Word: FC<{ value: string, pronunciation?: string }> = ({ value, pronunciation }) => {
  const { say } = useSpeech();
  return <div className='my-3 font-bold' >
    <button onClick={() => say(pronunciation ?? value)}>{value}</button>
  </div>
}

const ReviewPage: FC<{ className?: string }> = ({ className = '' }) => {
  const test = useTest();
  const midwayIndex = Math.ceil(test.words.length / 2);

  const firstColumn = [...test.words].splice(0, midwayIndex);
  const secondColumn = [...test.words].splice(midwayIndex, test.words.length);


  return <div className={`${className}`}>
    <div className="text-center font-bold">Week {'#'}{test.week}</div>
    <h3 className="text-center font-extrabold text-2xl">{test.rule}</h3>
    <div className='max-w-sm mx-auto p-5 flex flex-row my-5'>
      <div className='flex-1'>{firstColumn.map((q) => <Word key={q.spelling} value={q.spelling} pronunciation={q.pronunciation} />)}</div>
      <div className='flex-1'>{secondColumn.map((q) => <Word key={q.spelling} value={q.spelling} pronunciation={q.pronunciation} />)}</div>
    </div>
    <p className='max-w-sm mx-auto border-2 border-black p-2'>{test.advice}</p>
  </div>
}

export default ReviewPage;