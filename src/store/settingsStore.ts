import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

type KeyboardLayout = 'qwerty' | 'alpha';
type KeyboardStyle = 'gray' | 'colorful';
type CapitalizationMode = 'uppercase' | 'lowercase';

type AppSettings = {
  keyboardLayout: KeyboardLayout;
  keyboardStyle: KeyboardStyle;
  capitalization: CapitalizationMode;
  darkMode: boolean | null;
  maxCharacters: number;
}

const INITIAL_SETTINGS: AppSettings = {
  keyboardLayout: 'alpha',
  keyboardStyle: 'colorful',
  capitalization: 'lowercase',
  darkMode: false,
  maxCharacters: 10,
};

const LS_KEY = 'owldle.settings';

class SettingsStore {
  root: RootStore;
  settings: AppSettings = INITIAL_SETTINGS;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;

    this.load()
  }

  async load() {
    const settings = await localStorage.getItem(LS_KEY);

    if (settings) {
      this.settings = {
        ...INITIAL_SETTINGS,
        ...JSON.parse(settings),
      }
    }
  }

  set(key: keyof AppSettings, value: any): void {
    this.settings = {
      ...this.settings,
      [key]: value,
    }

    localStorage.setItem(LS_KEY, JSON.stringify(this.settings));

  }
}

export type { KeyboardLayout, KeyboardStyle, CapitalizationMode };
export default SettingsStore;
