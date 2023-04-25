const MIN_VERIFIER_LENGTH = 43
const MAX_VERIFIER_LENGTH = 128

export function generateCodeVerifier() {
  const verifier_length =
    MIN_VERIFIER_LENGTH +
    Math.round(Math.random() * (MAX_VERIFIER_LENGTH - MIN_VERIFIER_LENGTH))

  return generateRandomString(verifier_length)
}

/**
 * @see https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow#code-verifier
 */
export function generateRandomString(length: number) {
  let randomString = ''
  const possibleSymbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    randomString += possibleSymbols.charAt(
      Math.floor(Math.random() * possibleSymbols.length),
    )
  }

  return randomString
}

/**
 * @see https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow#code-challenge
 */
export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(verifierSha256: ArrayBuffer) {
    return btoa(
      String.fromCharCode.apply(
        null,
        new Uint8Array(verifierSha256) as unknown as number[], // array of 8 bit unsigned ints
      ),
    )
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)

  return base64encode(digest)
}
