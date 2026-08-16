import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import type { PillarKey } from './site'

export type Faq = { q: string; a: string }
export type ListItem = { name: string; description: string }
export type Source = { title: string; url: string }

export type Article = {
  slug: string
  title: string
  h1: string
  description: string
  targetQuery: string
  alsoAnswers: string[]
  pillar: PillarKey
  schemaType: 'Article' | 'FAQPage' | 'ItemList'
  isHub: boolean
  quickAnswer: string
  faqs: Faq[]
  listItems: ListItem[]
  internalLinks: string[]
  sources: Source[]
  readingTime: number
  wordCount: number
  html: string
  publishedAt: string
  updatedAt: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content')

// Fixed launch date so builds are deterministic and dates never drift forward.
const PUBLISHED_AT = '2026-08-16T12:00:00.000Z'

function toArray<T>(v: unknown): T[] {
  if (!v) return []
  return Array.isArray(v) ? (v as T[]) : [v as T]
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function renderMarkdown(md: string): string {
  const renderer = new marked.Renderer()

  renderer.heading = (text, level) => {
    const id = slugifyHeading(text)
    return `<h${level} id="${id}">${text}</h${level}>`
  }

  // External links open in a new tab but are NOT nofollowed: these are editorial
  // citations, and vouching for our sources is the whole point of the sourcing policy.
  renderer.link = (href, title, text) => {
    const t = title ? ` title="${title}"` : ''
    if (href && /^https?:\/\//i.test(href)) {
      return `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>`
    }
    return `<a href="${href}"${t}>${text}</a>`
  }

  marked.setOptions({ gfm: true, breaks: false })
  return marked.parse(md, { renderer }) as string
}

let cache: Article[] | null = null

export function getAllArticles(): Article[] {
  if (cache) return cache

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'HOUSE_STYLE.md')

  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const slug = String(data.slug || file.replace(/\.md$/, ''))
    const wordCount = content.trim().split(/\s+/).length

    return {
      slug,
      title: String(data.title || ''),
      h1: String(data.h1 || data.title || ''),
      description: String(data.description || ''),
      targetQuery: String(data.targetQuery || ''),
      alsoAnswers: toArray<string>(data.alsoAnswers),
      pillar: (data.pillar || 'slang') as PillarKey,
      schemaType: (data.schemaType || 'Article') as Article['schemaType'],
      isHub: Boolean(data.isHub),
      quickAnswer: String(data.quickAnswer || ''),
      faqs: toArray<Faq>(data.faqs),
      listItems: toArray<ListItem>(data.listItems),
      internalLinks: toArray<string>(data.internalLinks),
      sources: toArray<Source>(data.sources),
      readingTime: Number(data.readingTime) || Math.max(1, Math.round(wordCount / 220)),
      wordCount,
      html: renderMarkdown(content),
      publishedAt: PUBLISHED_AT,
      updatedAt: PUBLISHED_AT,
    } satisfies Article
  })

  // Hubs first, then longest — gives the homepage a sensible default ordering.
  articles.sort((a, b) => {
    if (a.isHub !== b.isHub) return a.isHub ? -1 : 1
    return b.wordCount - a.wordCount
  })

  cache = articles
  return articles
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug)
}

export function getArticlesByPillar(pillar: PillarKey): Article[] {
  return getAllArticles().filter((a) => a.pillar === pillar)
}

export function getHub(pillar: PillarKey): Article | undefined {
  return getAllArticles().find((a) => a.pillar === pillar && a.isHub)
}

/** Related = same pillar first, then explicit internal links, deduped. */
export function getRelated(article: Article, limit = 4): Article[] {
  const all = getAllArticles()
  const out: Article[] = []
  const seen = new Set([article.slug])

  for (const slug of article.internalLinks) {
    const found = all.find((a) => a.slug === slug)
    if (found && !seen.has(found.slug)) {
      out.push(found)
      seen.add(found.slug)
    }
  }
  for (const a of all) {
    if (out.length >= limit) break
    if (a.pillar === article.pillar && !seen.has(a.slug)) {
      out.push(a)
      seen.add(a.slug)
    }
  }
  return out.slice(0, limit)
}
