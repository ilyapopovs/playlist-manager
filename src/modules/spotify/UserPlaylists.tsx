import {
  type TGetUsersPlaylistsResponse,
  getUserPlaylists,
} from '@/modules/spotify/SpotifyUsersApi'
import { useState } from 'react'

/**
 * Temporary API showcase
 */
export const UserPlaylists = () => {
  const [username, setUsername] = useState('')
  const [response, setResponse] = useState<TGetUsersPlaylistsResponse>()

  return (
    <div className="mt-10">
      <h2>User&apos;s Playlists</h2>
      <div>
        <label htmlFor="username">Username</label>
        <br />
        <input
          className="bg-zinc-600"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          getUserPlaylists(username)
            .then((res) => {
              setResponse(res)
              console.log(`PLAYLISTS OF ${username}`, res)
            })
            .catch((e) => console.error(e))
        }}
      >
        Fetch Playlists
      </button>
      <br />
      <div className="inline-block border border-solid p-4">
        {response
          ? response.items.map((item) => <p key={item.id}>{item.name}</p>)
          : '...'}
      </div>
    </div>
  )
}
