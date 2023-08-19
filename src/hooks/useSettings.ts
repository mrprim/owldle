import { atom, useAtomValue } from "jotai";

type KeyboardLayout = 'qwerty' | 'alpha';
type KeyboardStyle = 'gray' | 'colorful';
type CapitalizationMode = 'uppercase' | 'lowercase';

type AppSettings = {
  keyboardLayout: KeyboardLayout,
  keyboardStyle: KeyboardStyle,
  capitalization: CapitalizationMode,
  darkMode: boolean,
  maxCharacters: number,
}

const INITIAL_SETTINGS: AppSettings = {
  keyboardLayout: 'alpha',
  keyboardStyle: 'colorful',
  capitalization: 'lowercase',
  darkMode: false,
  maxCharacters: 10,
};

const settingsAtom = atom(INITIAL_SETTINGS);

const useSettings = () => {
  const settings = useAtomValue(settingsAtom);

  return settings;
}

export type { KeyboardLayout, KeyboardStyle, CapitalizationMode };
export { settingsAtom };
export default useSettings;