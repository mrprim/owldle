import { FC } from 'react';
import useCurrentQuestion from '../hooks/useCurrentQuestion';
import useQuestions from '../hooks/useQuestions';
import GamePage from './GamePage';
import Navbar from './Navbar';
import YouWon from './YouWon';
import useScreen from '../hooks/useScreen';
import ReviewPage from './ReviewPage';
import SettingsPage from './SettingsPage';

const App: FC = () => {
  const [screen] = useScreen();
  const questions = useQuestions();
  const { id: questionId } = useCurrentQuestion();

  if (questionId >= questions.length) return <YouWon />

  return (
    <div className="flex flex-col min-h-full">
      <Navbar className="flex-0" />
      {screen === 'home' && <GamePage className="flex-1" />}
      {screen === 'review' && <ReviewPage className="flex-1" />}
      {screen === 'settings' && <SettingsPage className="flex-1" />}
    </div>
  )
}

export default App
