import {
  requestAccessToken,
  requestFirstAccessToken,
  requestUserAuthorization,
} from '@/modules/spotify/auth/spotifyAuthApi'
import { BASIC_AUTH_SCOPES } from '@/modules/spotify/auth/spotifyAuthScopes'
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_TTL_KEY,
  AUTH_REQUEST_STATE_KEY,
  AuthStorage,
  CODE_VERIFIER_KEY,
  REFRESH_TOKEN_KEY,
} from '@/modules/spotify/auth/spotifyAuthStorage'

// todo: move to `env` from env.mjs
const AUTH_API_BASE = process.env.NEXT_PUBLIC_AUTH_API_BASE!
const AUTH_ACCESS_TOKEN_PATH = process.env.NEXT_PUBLIC_AUTH_ACCESS_TOKEN_PATH!
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!
const APP_BASE = process.env.NEXT_PUBLIC_APP_BASE!

const REDIRECT_URL = APP_BASE + '/auth/spotify/callback'

/**
 * Generate and save code verifier & state, redirect to Spotify for auth
 */
export async function initSpotifyAuth() {
  const { authUrl, state, codeVerifier } = await requestUserAuthorization(
    REDIRECT_URL,
    CLIENT_ID,
    BASIC_AUTH_SCOPES.join(' '),
    AUTH_API_BASE + '/authorize',
  )

  AuthStorage.set(AUTH_REQUEST_STATE_KEY, state)
  AuthStorage.set(CODE_VERIFIER_KEY, codeVerifier)

  // window.location.replace(authUrl)
  window.location.assign(authUrl)
}

/**
 * Request and save Access Token & Refresh Token
 * @returns Access Token TTL in seconds
 */
export async function finishSpotifyAuth(): Promise<number> {
  const urlParams = new URLSearchParams(window.location.search)
  const authorizationCode = urlParams.get('code')
  const state = urlParams.get('state')
  const codeVerifier = AuthStorage.get(CODE_VERIFIER_KEY)

  if (!authorizationCode) {
    throw 'URL params missing'
  }

  if (!state || state !== AuthStorage.get(AUTH_REQUEST_STATE_KEY)) {
    throw "States don't match"
  }

  if (!codeVerifier) {
    throw 'Code verifier is missing'
  }

  const { access_token, expires_in, refresh_token } =
    await requestFirstAccessToken(
      authorizationCode,
      REDIRECT_URL,
      CLIENT_ID,
      codeVerifier,
      AUTH_API_BASE + AUTH_ACCESS_TOKEN_PATH,
    )

  AuthStorage.set(ACCESS_TOKEN_KEY, access_token)
  AuthStorage.set(REFRESH_TOKEN_KEY, refresh_token)
  AuthStorage.set(
    ACCESS_TOKEN_TTL_KEY,
    (Date.now() + expires_in * 1000).toString(),
  )

  return expires_in
}

export async function refreshAccessToken() {
  const refreshToken = AuthStorage.get(REFRESH_TOKEN_KEY)

  if (!refreshToken) {
    throw 'Refresh Token is missing'
  }

  const { access_token, expires_in, refresh_token } = await requestAccessToken(
    refreshToken,
    CLIENT_ID,
    AUTH_API_BASE + AUTH_ACCESS_TOKEN_PATH,
  )

  AuthStorage.set(ACCESS_TOKEN_KEY, access_token)
  AuthStorage.set(REFRESH_TOKEN_KEY, refresh_token)
  AuthStorage.set(
    ACCESS_TOKEN_TTL_KEY,
    (Date.now() + expires_in * 1000).toString(),
  )

  return expires_in
}

export function removeTokens() {
  AuthStorage.set(ACCESS_TOKEN_KEY, '')
  AuthStorage.set(REFRESH_TOKEN_KEY, '')
  AuthStorage.set(ACCESS_TOKEN_TTL_KEY, '')
}
