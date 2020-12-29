import {writeFileSync} from 'fs'
import got from 'got'
import {JSDOM} from 'jsdom'
import {showColors} from 'dominant-colors'
import {GameId, GeekGame} from '../types'

async function main() {
  const bestGameIds = await getBestGameIds()
  console.log(`Received ${bestGameIds.length} games`)
  const data = await getAllGameDetails(bestGameIds)
  console.log('Fetching details...')

  console.log(await getASIN(bestGameIds[0]))

  writeFileSync('./games.json', JSON.stringify(data, null, '  '))
}

async function getBestGameIds(): Promise<GameId[]> {
  const url = `https://boardgamegeek.com/browse/boardgame`
  const response = await got(url)
  const document = new JSDOM(response.body).window.document
  const links = Array.from(document.querySelectorAll('.collection_thumbnail a'))
  const ids = links.map((link) => link.getAttribute('href').split('/')[2])

  return ids
}

async function getASIN(gameId: GameId) {
  const {us} = await got(
    `https://api.geekdo.com/api/amazon/itemurls?locale=us&objectid=${gameId}&objecttype=thing`
  ).json()
  const url = new URL('https:' + us)
  return url.searchParams.get('asins')
}

async function getAllGameDetails(ids: GameId[]): Promise<GeekGame[]> {
  return await Promise.all(ids.map((id) => getGame(id)))
}

async function getGame(id: GameId): Promise<GeekGame> {
  const url = `https://boardgamegeek.com/boardgame/${id}`
  const {body} = await got(url)
  const document = new JSDOM(body).window.document
  const image = document
    .querySelector('meta[property~="og:image"]')
    .getAttribute('content')

  const name = document
    .querySelector('meta[name~="title"]')
    .getAttribute('content')

  const asin = await getASIN(id)
  const color: string = (await showColors(image, 1))[0]
  return {
    image,
    name,
    color,
    href: url,
    asin
  }
}

main()
