import { FC } from 'react';
import useScreen from '../hooks/useScreen';
import GamePage from './GamePage';
import Navbar from './Navbar';
import ReviewPage from './ReviewPage';
import SettingsPage from './SettingsPage';

const App: FC = () => {
  const [screen] = useScreen();

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
