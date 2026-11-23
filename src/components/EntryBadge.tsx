import { useEffect, useState } from 'react'
import { Cloud, Home } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import {
  detectMuseumEntryKind,
  isMuseumEntryHostname,
  type MuseumEntryKind,
} from './entry-detection'

/**
 * Small header chip showing whether the museum is reached through the LAN
 * reverse proxy or the public Cloudflare path. Renders nothing off the
 * museum's own domain (local review, e2e, prerender) and until probed.
 */
export function EntryBadge() {
  const { messages } = useI18n()
  const [entry, setEntry] = useState<MuseumEntryKind | null>(null)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !isMuseumEntryHostname(window.location.hostname)
    ) {
      return
    }
    let cancelled = false
    void detectMuseumEntryKind(window.location.href, fetch).then((kind) => {
      if (!cancelled) {
        setEntry(kind)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (entry === null) {
    return null
  }

  return (
    <span className="entry-badge" data-entry={entry}>
      {entry === 'lan' ? (
        <Home aria-hidden="true" size={12} strokeWidth={2.2} />
      ) : (
        <Cloud aria-hidden="true" size={12} strokeWidth={2.2} />
      )}
      <span>
        {entry === 'lan' ? messages.entryBadge.lan : messages.entryBadge.cloud}
      </span>
    </span>
  )
}
