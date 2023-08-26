import { FC } from 'react';
import StartPage from './StartPage';
import InProgressGamePage from './InProgressGamePage';
import VictoryPage from './VictoryPage';
import { observer } from 'mobx-react-lite'
import store from '../../store'

const GamePage: FC<{ className?: string }> = observer(({ className }) => {
  const questionId = store.currentQuestionId;
  const questions = store.getTest()?.words;

  if (!questions) return null;
  if (questionId == null) return <StartPage className={className} />
  if (questionId >= questions.length) return <VictoryPage className={className} />
  return <InProgressGamePage className={className} />
});

export default GamePage;