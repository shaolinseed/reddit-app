import { atom } from "jotai"

export interface authModalState {
  open: boolean
  view: "logIn" | "createAccount" | "resetPassword"
}

export const defaultModalState = {
  open: false,
  view: "logIn",
}

/**
 * Store the auth modal state in jotai to allow
 * multiple components to access the state
 */
export const authModalAtom = atom<authModalState>({
  open: false,
  view: "logIn",
})
