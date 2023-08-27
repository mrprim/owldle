import { FC } from "react";
import { observer } from 'mobx-react-lite'
import store from "../../store";

const SettingsPage: FC<{ className: string }> = observer(({ className = '' }) => {
  const settings = store.settingsStore.settings;

  return (
    <div className={className}>
      <div className='max-w-lg mx-auto px-4 mt-8'>

        <div className="flex flex-row my-4 items-center gap-4">
          <div className="flex-1 text-right">Site Style</div>
          <select className="flex-1 rounded-full dark:bg-slate-900 px-6" onChange={(e) => {
            const value = e.target.value;
            const encoded = value === 'default' ? null : value === 'dark'
            store.settingsStore.set('darkMode', encoded);
          }}>
            <option value="default" selected={settings.darkMode === null}>default</option>
            <option value="light" selected={settings.darkMode === false}>light</option>
            <option value="dark" selected={settings.darkMode === true}>dark</option>
          </select>
        </div>

        <div className="flex flex-row my-4 items-center gap-4">
          <div className="flex-1 text-right">Capitalization</div>
          <select className="flex-1 rounded-full dark:bg-slate-900 px-6" onChange={(e) => store.settingsStore.set('capitalization', e.target.value)}>
            <option value="lowercase" selected={settings.capitalization === 'lowercase'}>lowercase</option>
            <option value="uppercase" selected={settings.capitalization === 'uppercase'}>UPPERCASE</option>
          </select>
        </div>

        <div className="flex flex-row my-4 items-center gap-4">
          <div className="flex-1 text-right">Keyboard Layout</div>
          <select className="flex-1 rounded-full dark:bg-slate-900 px-6" onChange={(e) => store.settingsStore.set('keyboardLayout', e.target.value)}>
            <option value="alpha" selected={settings.keyboardLayout === 'alpha'}>alpha</option>
            <option value="qwerty" selected={settings.keyboardLayout === 'qwerty'}>qwerty</option>
          </select>
        </div>

        <div className="flex flex-row my-4 items-center gap-4">
          <div className="flex-1 text-right">Keyboard Style</div>
          <select className="flex-1 rounded-full dark:bg-slate-900 px-6" onChange={(e) => store.settingsStore.set('keyboardStyle', e.target.value)}>
            <option value="colorful" selected={settings.keyboardStyle === 'colorful'}>colorful</option>
            <option value="gray" selected={settings.keyboardStyle === 'gray'}>gray</option>
          </select>
        </div>
      </div>
    </div>
  );
});

export default SettingsPage;