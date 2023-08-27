import { FC } from 'react';
import GamePage from './GamePage';
import Navbar from './Navbar';
import ReviewPage from './ReviewPage';
import SettingsPage from './SettingsPage';
import { observer } from 'mobx-react-lite';
import store from '../store';

const App: FC = observer(() => {
  const screen = store.routingStore.screen;
  return (
    <div className="flex flex-col min-h-full">
      <Navbar className="flex-0" />
      {screen === 'home' && <GamePage className="flex-1" />}
      {screen === 'review' && <ReviewPage className="flex-1" />}
      {screen === 'settings' && <SettingsPage className="flex-1" />}
    </div>
  )
});

export default App
