import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store';

const StartPage: FC<{ className?: string }> = observer(({ className }) => {
  const reset = () => store.gameStateStore.setCurrentWord(0);

  return (
    <div className={`${className ?? ''} text-center flex flex-col justify-center`}>
      <div className='flex-1 p-4 mx-auto items-center flex justify-center'>
        <button className='bg-violet-300 dark:bg-violet-700 text-2xl font-extrabold rounded-lg p-4 w-40' onClick={reset}>
          START
        </button>
      </div>
      <div className='flex-1'>
      </div>
    </div>
  )
});

export default StartPage;