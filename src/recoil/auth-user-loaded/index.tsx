import { atom } from 'recoil';

export const authUserLoadedAtom = atom({
  key: 'authUserLoaded',
  default: false,
});
