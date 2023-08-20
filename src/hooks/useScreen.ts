import { atom, useAtom, useSetAtom } from "jotai";

type Screens = 'home' | 'settings' | 'review'

const screenAtom = atom<Screens>('home')

const useScreen = () => {
  return useAtom(screenAtom);
}

const useSetScreen = () => {
  return useSetAtom(screenAtom);
}

export { useSetScreen }
export default useScreen;