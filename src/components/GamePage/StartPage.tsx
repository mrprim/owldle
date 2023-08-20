import { useSetAtom } from 'jotai';
import { FC } from 'react';
import { currentQuestionIdAtom } from '../../hooks/useCurrentQuestion';

const StartPage: FC<{ className?: string }> = ({ className }) => {
  const setCurrentQuestion = useSetAtom(currentQuestionIdAtom);

  return (
    <div className={`${className ?? ''} text-center flex flex-col justify-center`}>
      <div className='flex-1 p-4 mx-auto items-center flex justify-center'>
        <button className='bg-violet-300 text-2xl font-extrabold rounded-lg p-4 w-40' onClick={() => setCurrentQuestion(0)}>
          START
        </button>
      </div>
      <div className='flex-1'>
      </div>
    </div>
  )
}

export default StartPage;