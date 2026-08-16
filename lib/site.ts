export const SITE = {
  name: 'HipHopHumor',
  domain: 'hiphophumor.com',
  url: 'https://hiphophumor.com',
  tagline: 'Rap, explained properly.',
  description:
    'Straight answers about hip-hop ad-libs, nicknames and slang. Where the names came from, what the words mean, and why any of it is funny.',
  locale: 'en_US',
  contactEmail: 'support@hiphophumor.com',
  author: {
    name: 'The HipHopHumor Desk',
    url: 'https://hiphophumor.com/about',
  },
  social: {
    // Add profiles here as they are created; sameAs is emitted only for non-empty values.
  } as Record<string, string>,
} as const

export const PILLARS = {
  adlibs: {
    key: 'adlibs',
    name: 'Ad-Libs & Producer Tags',
    short: 'Ad-Libs',
    slug: 'ad-libs',
    blurb:
      'The grunts, yelps and drops that make a rap song identifiable in two seconds. What they mean and who actually says them.',
  },
  names: {
    key: 'names',
    name: 'Names & Nicknames',
    short: 'Names',
    slug: 'names',
    blurb:
      'Where rap aliases come from — the childhood names, the alter egos, the flexes, and the government names underneath them all.',
  },
  slang: {
    key: 'slang',
    name: 'Rap Slang',
    short: 'Slang',
    slug: 'slang',
    blurb:
      'Real etymology for the words rap actually uses, with the context the slang dictionaries leave out.',
  },
} as const

export type PillarKey = keyof typeof PILLARS
