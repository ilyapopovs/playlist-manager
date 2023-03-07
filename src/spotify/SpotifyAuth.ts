import { atom, useSetAtom } from 'jotai'

export type SpotifyAuth = {
  code_verifier?: string | null | undefined
  code_challenge?: string | null | undefined
  refresh_token?: string | null | undefined
  bearer_token?: string | null | undefined
  bearer_expiry?: Date | null | undefined
}

// const codeVerifierAtom = atom<string | null | undefined>(undefined)
// const codeChallengeAtom = atom<string | null | undefined>(undefined)
// const refreshTokenAtom = atom<string | null | undefined>(undefined)
// const bearerTokenAtom = atom<string | null | undefined>(undefined)
// const bearerExpiryAtom = atom<Date | null | undefined>(undefined)
// const authAtom = atom<SpotifyAuth>((get) => ({
//   code_verifier: get(codeVerifierAtom),
//   code_challenge: get(codeChallengeAtom),
//   refresh_token: get(refreshTokenAtom),
//   bearer_token: get(bearerTokenAtom),
//   bearer_expiry: get(bearerExpiryAtom),
// }))

export const spotifyAuth: SpotifyAuth = {}
export const isAuthenticatedAtom = atom<boolean>(false)

export function useAuthenticate() {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)

  return async () => {
    await authenticate()
    setIsAuthenticated(true)
  }
}

export function useLogout() {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)

  return async () => {
    await logout()
    setIsAuthenticated(false)
  }
}

export async function authenticate() {
  return Promise.resolve()
}

export async function logout() {
  return Promise.resolve()
}
