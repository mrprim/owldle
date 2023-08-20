import useCurrentQuestion from '../../hooks/useCurrentQuestion';
import { FC } from 'react';
import useQuestions from '../../hooks/useQuestions';
import StartPage from './StartPage';
import InProgressGamePage from './InProgressGamePage';
import VictoryPage from './VictoryPage';

const GamePage: FC<{ className?: string }> = ({ className }) => {
  const questions = useQuestions();
  const { id: questionId } = useCurrentQuestion();

  if (questionId == null) return <StartPage className={className} />
  if (questionId >= questions.length) return <VictoryPage className={className} />
  return <InProgressGamePage className={className} />
}

export default GamePage;