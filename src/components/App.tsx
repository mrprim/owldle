import { FC } from 'react';
import GamePage from './GamePage';
import Navbar from './Navbar';
import ReviewPage from './ReviewPage';
import SettingsPage from './SettingsPage';
import { observer } from 'mobx-react-lite';
import store from '../store';

const App: FC = observer(() => {
  const screen = store.routingStore.screen;
  const darkModeSetting = store.settingsStore.settings.darkMode;

  const isDarkMode = darkModeSetting === null ? window.matchMedia('(prefers-color-scheme: dark)').matches : darkModeSetting;
  return (
    <div className={`${isDarkMode ? 'dark' : ''} flex flex-col min-h-full`}>
      <div className={`flex flex-1 flex-col min-h-full text-slate-800 dark:text-white bg-white dark:bg-slate-900`}>
        <Navbar className="flex-0" />
        {screen === 'home' && <GamePage className="flex-1" />}
        {screen === 'review' && <ReviewPage className="flex-1" />}
        {screen === 'settings' && <SettingsPage className="flex-1" />}
      </div>
    </div>
  )
});

export default App
