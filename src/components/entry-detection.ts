export type MuseumEntryKind = 'lan' | 'cloud'

/**
 * The entry badge is only meaningful when the museum is served from its own
 * public / LAN domain; local review, e2e and prerender hosts stay badge-free.
 */
export function isMuseumEntryHostname(hostname: string): boolean {
  return hostname.endsWith('.jasonteam.top')
}

/**
 * Cloudflare edge responses always carry `cf-ray`; the LAN Caddy path never
 * does, because it terminates TLS at the local reverse proxy. A failed probe
 * (for example a cross-origin redirect to the Access login page once the
 * session has expired) can only happen on the public path, so treat any
 * rejection as cloud.
 */
export async function detectMuseumEntryKind(
  url: string,
  doFetch: typeof fetch,
): Promise<MuseumEntryKind> {
  try {
    const response = await doFetch(url, { method: 'HEAD', cache: 'no-store' })
    return response.headers.has('cf-ray') ? 'cloud' : 'lan'
  } catch {
    return 'cloud'
  }
}
