// Functions for calling Spotify API endpoints that start with /users

import { env } from '@/env.mjs'
import {
  ACCESS_TOKEN_KEY,
  AuthStorage,
} from '@/modules/spotify/auth/spotifyAuthStorage'

const API_BASE = env.NEXT_PUBLIC_API_BASE

export type TGetUsersPlaylistsResponse = {
  href: string
  items: {
    collaborative: boolean
    description: string
    external_urls: Record<string, string> & { spotify: string }
    href: string
    id: string
    images: { height: any | null; url: string; width: any | null }[]
    name: string
    owner: {
      display_name: string
      external_urls: Record<string, string> & { spotify: string }
      href: string
      id: string
      type: string
      uri: string
    }
    primary_color: any | null
    public: boolean
    snapshot_id: string
    tracks: {
      href: string
      total: number
    }
    type: string
    uri: string
  }[]
  limit: number
  next: string
  offset: number
  previous: string | null
  total: number
}

export async function getUserPlaylists(
  username: string,
): Promise<TGetUsersPlaylistsResponse> {
  const accessToken = AuthStorage.get(ACCESS_TOKEN_KEY)

  if (!accessToken) {
    throw 'Access Token missing'
  }

  // ⚠️ throws exceptions on network errors
  const response = await fetch(`${API_BASE}/users/${username}/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const responseJson = (await response.json()) as TGetUsersPlaylistsResponse

  return responseJson
}
