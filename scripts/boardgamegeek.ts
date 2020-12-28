import {writeFileSync} from 'fs'
import got from 'got'
import {JSDOM} from 'jsdom'
import {GeekGame} from './boardgamegeek.type'

type GameId = string

async function getGameDetails(objectid: GameId): Promise<GeekGame> {
  const url = `https://api.geekdo.com/api/geekmarket/products?ajax=1&nosession=1&objectid=${objectid}&objecttype=thing&pageid=1&showcount=1`
  return await got(url).json()
}

async function getBestGameIds(): Promise<GameId[]> {
  const url = `https://boardgamegeek.com/browse/boardgame`
  const response = await got(url)
  const document = new JSDOM(response.body).window.document
  const links = Array.from(document.querySelectorAll('.collection_thumbnail a'))
  const ids = links.map((link) => link.getAttribute('href').split('/')[2])

  return ids
}

async function getAllGameDetails(ids: string[]) {
  return await Promise.all(ids.map((id) => getGameDetails(id)))
}

async function main() {
  const bestGameIds = await getBestGameIds()
  const allGameDetails = await getAllGameDetails(bestGameIds)

  const data = allGameDetails.map((details) => {
    return {
      href: details.linkeditem.href,
      name: details.linkeditem.name,
      image:
        details.linkeditem.image.images.mediacard['src@2x'] ||
        details.linkeditem.image.images.mediacard.src
    }
  })
  writeFileSync('./games.json', JSON.stringify(data, null, '  '))
}

main()
