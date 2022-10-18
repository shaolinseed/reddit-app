import { atom } from "jotai"

export interface authModalState {
  open: boolean
  view: "logIn" | "signUp" | "resetPassword"
}

export const defaultModalState = {
  open: false,
  view: "logIn",
}

export const authModalAtom = atom<authModalState>({
  open: false,
  view: "logIn",
})
