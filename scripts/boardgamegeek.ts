import {writeFileSync} from 'fs'
import got from 'got'
import {JSDOM} from 'jsdom'

async function main() {
  const bestGameIds = await getBestGameIds()
  console.log(`Received ${bestGameIds.length} games`)
  const data = await getAllGameDetails(bestGameIds)

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

async function getAllGameDetails(ids: GameId[]): Promise<Game[]> {
  return await Promise.all(ids.map((id) => getGamePage(id)))
}

async function getGamePage(id: GameId): Promise<Game> {
  const url = `https://boardgamegeek.com/boardgame/${id}`
  const {body} = await got(url)
  const document = new JSDOM(body).window.document
  const image = document
    .querySelector('meta[property~="og:image"]')
    .getAttribute('content')

  const name = document
    .querySelector('meta[name~="title"]')
    .getAttribute('content')
  return {
    image,
    name,
    href: url
  }
}

type Game = {
  href: string
  name: string
  image: string
}

type GameId = string

main()
