import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateRandomString,
} from '@/modules/spotify/auth/spotifyHelpers'

type TRequestUserAuthorization = (
  redirectUrl: string,
  clientId: string,
  scopes: string,
  authEndpoint: string,
) => Promise<{
  authUrl: string
  state: string
  codeVerifier: string
}>

/**
 * Provide everything necessary to make a user authorization request with Spotify. \
 * ℹ️ Doesn't make a request itself because it has to be a redirect.
 */
export const requestUserAuthorization: TRequestUserAuthorization = async (
  redirectUrl,
  clientId,
  scopes,
  authEndpoint,
) => {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  const state = generateRandomString(16)

  const args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUrl,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  })

  const authUrl = authEndpoint + '?' + args.toString()

  return {
    authUrl,
    state,
    codeVerifier,
  }
}

type TRequestFirstAccessToken = (
  authorizationCode: string,
  redirectUrl: string,
  clientId: string,
  codeVerifier: string,
  accessTokenEndpoint: string,
) => Promise<TAccessTokenEndpointResponse>

type TAccessTokenEndpointResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

/**
 * Request Access Token. Return it + a Refresh Token. \
 * ℹ️ First Access Token is requested using the Authorization code. Subsequent Access Tokens are requested using the Refresh Token.
 */
export const requestFirstAccessToken: TRequestFirstAccessToken = async (
  authorizationCode,
  redirectUrl,
  clientId,
  codeVerifier,
  accessTokenEndpoint,
) => {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: redirectUrl,
    client_id: clientId,
    code_verifier: codeVerifier,
  })

  // ⚠️ throws exceptions on network errors
  const response = await fetch(accessTokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const responseJson = (await response.json()) as TAccessTokenEndpointResponse

  return responseJson
}

type TRequestAccessToken = (
  refreshToken: string,
  clientId: string,
  accessTokenEndpoint: string,
) => Promise<TAccessTokenEndpointResponse>

/**
 * Request new Access Token & Refresh Token with an existing Refresh Token
 */
export const requestAccessToken: TRequestAccessToken = async (
  refreshToken,
  clientId,
  accessTokenEndpoint,
) => {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
  })

  // ⚠️ throws exceptions on network errors
  const response = await fetch(accessTokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const responseJson = (await response.json()) as TAccessTokenEndpointResponse

  return responseJson
}
