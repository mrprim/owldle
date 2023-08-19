import { useAtomValue, useSetAtom } from "jotai";
import atomWithLocalStorage from "../utils/atomWithLocalStorage";

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

const settingsAtom = atomWithLocalStorage('owldle.settings', INITIAL_SETTINGS);

const useSettings = (): AppSettings => {
  const settings = useAtomValue(settingsAtom);

  return settings;
}

type SettingSetter = (key: string, value: any) => void;

const useSetSetting = (): SettingSetter => {
  const setSettings = useSetAtom(settingsAtom);

  return (key, value) => setSettings((s: any) => ({
    ...s,
    [key]: value,
  }))
}

export type { KeyboardLayout, KeyboardStyle, CapitalizationMode };
export { settingsAtom, useSetSetting };
export default useSettings;