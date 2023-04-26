const READ_SUBSCRIPTION_DETAILS = 'user-read-private'
const READ_EMAIL_ADDRESS = 'user-read-email'

const READ_PRIVATE_PLAYLISTS = 'playlist-read-private'
const READ_COLLABORATIVE_PLAYLISTS = 'playlist-read-collaborative'
const WRITE_PRIVATE_PLAYLISTS = 'playlist-modify-private'
const WRITE_PUBLIC_PLAYLISTS = 'playlist-modify-public'

const WRITE_SAVED_CONTENT = 'user-library-modify'
const READ_SAVED_CONTENT = 'user-library-read'

export const BASIC_AUTH_SCOPES = [
  READ_SUBSCRIPTION_DETAILS,
  READ_EMAIL_ADDRESS,
  READ_PRIVATE_PLAYLISTS,
  READ_COLLABORATIVE_PLAYLISTS,
  WRITE_PRIVATE_PLAYLISTS,
  WRITE_PUBLIC_PLAYLISTS,
  WRITE_SAVED_CONTENT,
  READ_SAVED_CONTENT,
]
