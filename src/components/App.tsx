import { FC } from 'react';
import useCurrentQuestion from '../hooks/useCurrentQuestion';
import useQuestions from '../hooks/useQuestions';
import GamePage from './GamePage';
import Navbar from './Navbar';
import YouWon from './YouWon';
import SettingsModal from './SettingsModal';

const App: FC = () => {
  const questions = useQuestions();
  const { id: questionId } = useCurrentQuestion();

  if (questionId >= questions.length) return <YouWon />

  return (
    <div className="flex flex-col min-h-full">
      <Navbar className="flex-0" />
      <GamePage className="flex-1" />
      {/* <SettingsModal /> */}
    </div>
  )
}

export default App
