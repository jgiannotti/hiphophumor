// Words/phrases that auto-disqualify a post regardless of upvotes.
// The brand is edgy and unfiltered — profanity, beef, shots fired, all welcome.
// This list is NOT a vibe-police. It's a legal/brand firewall: hard slurs,
// hate targeting protected groups, doxxing, sexual-minor red lines, and direct
// calls for self-harm. That's the line. Everything short of it ships.

// IMPORTANT: this list intentionally avoids common rap vocabulary (community
// in-group usage, swearing, disses, etc.) because filtering those would gut the
// feed. We filter material that gets a brand sued or platform-banned — not
// material that's merely crude or savage.

// Substrings checked case-insensitively in TITLE only (image content is judged
// indirectly via subreddit allowlist + upvote thresholds).

export const TITLE_BLOCKLIST: string[] = [
  // Hard slurs we will never platform
  'tranny', 'faggot', 'kike', 'spic ', 'chink', 'wetback', 'beaner',
  // Ableist slur
  'retard',
  // Doxxing / personal attack signals
  ' home address', ' phone number of ', 'leaked photos of', 'leaked nudes',
  'irl pic of ', // often used for doxxing context
  // Sexual / underage red lines
  'cp ', 'child p', 'underage', 'jailbait',
  // Direct self-harm encouragement
  'kys ', 'kill yourself',
];

export function passesBlocklist(title: string): boolean {
  const t = title.toLowerCase();
  return !TITLE_BLOCKLIST.some((bad) => t.includes(bad));
}
