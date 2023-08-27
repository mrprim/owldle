import { FC } from 'react';
import StartPage from './StartPage';
import InProgressGamePage from './InProgressGamePage';
import VictoryPage from './VictoryPage';
import { observer } from 'mobx-react-lite'
import store from '../../store';

const GamePage: FC<{ className?: string }> = observer(({ className }) => {
  const wordId = store.gameStateStore.wordId;
  const words = store.gameStateStore.wordList?.words;

  if (!words) return null;
  if (wordId == null) return <StartPage className={className} />
  if (wordId >= words.length) return <VictoryPage className={className} />
  return <InProgressGamePage className={className} />
});

export default GamePage;