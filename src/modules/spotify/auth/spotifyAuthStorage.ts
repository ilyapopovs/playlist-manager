const PREFIX = 'playlist-manager-'
export const AUTH_REQUEST_STATE_KEY = PREFIX + 'state' // the one passed to `/authorize?...`
export const CODE_VERIFIER_KEY = PREFIX + 'code-verifier'
export const REFRESH_TOKEN_KEY = PREFIX + 'refresh-token'
export const ACCESS_TOKEN_KEY = PREFIX + 'access-token'
export const ACCESS_TOKEN_TTL_KEY = PREFIX + 'access-token-ttl'

function get(key: string) {
  return localStorage.getItem(key)
}

function set(key: string, value: string) {
  localStorage.setItem(key, value)
}

/**
 * Persistent storage for Auth-related data
 */
export const AuthStorage = { get, set }
