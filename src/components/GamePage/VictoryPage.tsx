import { FC } from "react";
import { useSetAtom } from "jotai";
import { currentQuestionIdAtom } from "../../hooks/useCurrentQuestion";

const VictoryPage: FC<{ className?: string }> = ({ className = '' }) => {
  const setCurrentQuestion = useSetAtom(currentQuestionIdAtom);

  return (
    <div className={`${className} flex flex-col justify-center bg-emerald-500 text-center`}>
      <p className="flex-0 text-white text-3xl font-extrabold">
        🎉GOOD JOB!🎉
      </p>
      <button className='bg-violet-300 mx-auto w-40 mt-5 text-2xl font-extrabold rounded-lg p-4'
        onClick={() =>
          setCurrentQuestion(0)}>
        AGAIN
      </button>
    </div >
  );
}

export default VictoryPage;