import { FC } from "react"
import useTest from "../../hooks/useTest";

const ReviewPage: FC<{ className?: string }> = ({ className = '' }) => {
  const test = useTest();
  const midwayIndex = Math.ceil(test.words.length / 2);

  const firstColumn = [...test.words].splice(0, midwayIndex);
  const secondColumn = [...test.words].splice(midwayIndex, test.words.length);


  return <div className={`${className}`}>
    <div className="text-center">Week {'#'}{test.week}</div>
    <h3 className="text-center">{test.rule}</h3>
    <div className='max-w-sm mx-auto p-5 flex flex-row'>
      <div className='flex-1'>{firstColumn.map((q) => <div key={q}>{q}</div>)}</div>
      <div className='flex-1'>{secondColumn.map((q) => <div key={q}>{q}</div>)}</div>
    </div>
    <p className='max-w-sm mx-auto border-2 border-black p-2'>{test.advice}</p>
  </div>
}

export default ReviewPage;