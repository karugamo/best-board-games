import {writeFileSync} from 'fs'
import got from 'got'
import {JSDOM} from 'jsdom'
import {showColors} from 'dominant-colors'
import {GameId, GeekGame} from '../types'

async function main() {
  const bestGameIds = await getBestGameIds()
  console.log(`Received ${bestGameIds.length} games`)
  console.log('Fetching details...')
  const data = await getAllGameDetails(bestGameIds)

  writeFileSync('./games.json', JSON.stringify(data, null, '  '))
}

async function getBestGameIds(): Promise<GameId[]> {
  let ids: string[] = []
  for (const pageNumber of [1, 2]) {
    const url = `https://boardgamegeek.com/browse/boardgame/page/${pageNumber}`
    const response = await got(url)
    const document = new JSDOM(response.body).window.document
    const links = Array.from(
      document.querySelectorAll('.collection_thumbnail a')
    )
    ids = ids.concat(
      links.map((link) => link.getAttribute('href')?.split('/')[2] as string)
    )
  }

  return ids
}

async function getASIN(gameId: GameId) {
  const {us} = await got(
    `https://api.geekdo.com/api/amazon/itemurls?locale=us&objectid=${gameId}&objecttype=thing`
  ).json()
  const url = new URL('https:' + us)
  return url.searchParams.get('asins') ?? ''
}

async function getAllGameDetails(ids: GameId[]): Promise<GeekGame[]> {
  return await Promise.all(ids.map((id) => getGame(id)))
}

async function getGame(id: GameId): Promise<GeekGame> {
  const url = `https://boardgamegeek.com/boardgame/${id}`
  const {body} = await got(url)
  const document = new JSDOM(body).window.document
  const image =
    document
      .querySelector('meta[property~="og:image"]')
      ?.getAttribute('content') ?? ''

  const name =
    document.querySelector('meta[name~="title"]')?.getAttribute('content') ?? ''

  // yolo
  const {item} = eval(
    document.querySelectorAll('script')[1].innerHTML + '\n GEEK.geekitemPreload'
  )

  const weight = Number(item.stats.avgweight)
  const rating = Number(item.stats.average)
  const minAge = Number(item.minage)
  const players: [number, number] = [
    Number(item.minplayers),
    Number(item.maxplayers)
  ]
  const playtime: [number, number] = [
    Number(item.minplaytime),
    Number(item.maxplaytime)
  ]

  const subdomains = item.links.boardgamesubdomain.map(({name}) => name)
  const mechanics = item.links.boardgamemechanic.map(({name}) => name)
  const families = item.links.boardgamefamily.map(({name}) => name)
  const categories = [...subdomains, ...mechanics, ...families]

  const asin = await getASIN(id)
  const color: string = (await showColors(image, 1))[0]

  return {
    id,
    image,
    name,
    color,
    href: url,
    asin,
    weight,
    minAge,
    players,
    playtime,
    categories,
    rating
  }
}

main()
