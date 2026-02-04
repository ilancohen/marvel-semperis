/**
 * Returns 10 random IDs from the top 100 characters (top100.json).
 */

import top100 from '@/data/top100.json'

type Top100Entry = { id: number; name: string }
const entries = top100 as Top100Entry[]

/**
 * Returns 10 distinct random IDs from top100.json.
 */
export function getRandomIds(count: number): number[] {
  const cap = Math.min(count, entries.length)
  const seen = new Set<number>()
  while (seen.size < cap) {
    const idx = Math.floor(Math.random() * entries.length)
    seen.add(entries[idx].id)
  }
  return [...seen]
}
