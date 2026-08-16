// Notifies IndexNow (Bing, Yandex, Seznam, Naver) that URLs changed.
//
// Google does not participate in IndexNow and no longer honours sitemap pings —
// it discovers changes via the sitemap and Search Console. This covers everyone else,
// and it costs nothing to keep current.

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const HOST = 'hiphophumor.com'
const KEY = '8cdadfb1daafd5afd865cf1ab6949441'
const ORIGIN = `https://${HOST}`

const slugs = readdirSync(join(process.cwd(), 'content'))
  .filter((f) => f.endsWith('.md') && f !== 'HOUSE_STYLE.md')
  .map((f) => {
    const m = readFileSync(join(process.cwd(), 'content', f), 'utf8').match(/^slug:\s*"?([^"\n]+)"?/m)
    return m ? m[1].trim() : f.replace(/\.md$/, '')
  })

const urlList = [
  ORIGIN,
  `${ORIGIN}/about`,
  `${ORIGIN}/editorial-policy`,
  ...['ad-libs', 'names', 'slang'].map((p) => `${ORIGIN}/topics/${p}`),
  ...slugs.map((s) => `${ORIGIN}/${s}`),
]

const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status}`)
// 200 = accepted, 202 = accepted pending key validation. Neither should fail the build.
if (![200, 202].includes(res.status)) {
  console.log('Response:', (await res.text()).slice(0, 500))
}
