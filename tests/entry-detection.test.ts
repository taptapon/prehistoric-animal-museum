import { describe, expect, it } from 'vitest'
import {
  detectMuseumEntryKind,
  isMuseumEntryHostname,
  type MuseumEntryKind,
} from '../src/components/entry-detection'

describe('isMuseumEntryHostname', () => {
  it('accepts the museum public and LAN domain', () => {
    expect(isMuseumEntryHostname('museum.jasonteam.top')).toBe(true)
  })

  it('rejects localhost, loopback and empty hosts', () => {
    expect(isMuseumEntryHostname('localhost')).toBe(false)
    expect(isMuseumEntryHostname('127.0.0.1')).toBe(false)
    expect(isMuseumEntryHostname('')).toBe(false)
  })

  it('rejects lookalike hosts that merely contain the domain', () => {
    expect(isMuseumEntryHostname('notjasonteam.top')).toBe(false)
    expect(isMuseumEntryHostname('museum.jasonteam.top.example.com')).toBe(false)
  })
})

function stubFetchWith(responseHeaders: Record<string, string>): typeof fetch {
  return (async () =>
    new Response(null, { headers: responseHeaders })) as unknown as typeof fetch
}

describe('detectMuseumEntryKind', () => {
  it('reports cloud when the Cloudflare edge answers (cf-ray present)', async () => {
    const kind = await detectMuseumEntryKind(
      'https://museum.jasonteam.top/',
      stubFetchWith({ 'cf-ray': '8f2a1blax01' }),
    )
    expect<MuseumEntryKind>(kind).toBe('cloud')
  })

  it('reports lan when the local Caddy answers (no cf-ray)', async () => {
    const kind = await detectMuseumEntryKind(
      'https://museum.jasonteam.top/',
      stubFetchWith({ 'content-type': 'text/html; charset=utf-8' }),
    )
    expect<MuseumEntryKind>(kind).toBe('lan')
  })

  it('falls back to cloud when the probe fails (e.g. Access login redirect)', async () => {
    const failingFetch = (async () => {
      throw new TypeError('cross-origin redirect to Access login')
    }) as unknown as typeof fetch
    const kind = await detectMuseumEntryKind(
      'https://museum.jasonteam.top/',
      failingFetch,
    )
    expect<MuseumEntryKind>(kind).toBe('cloud')
  })
})
