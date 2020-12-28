import {writeFileSync} from 'fs'
import got from 'got'
import {JSDOM} from 'jsdom'
import {GeekGame, GeekItem} from './boardgamegeek.type'

async function getGameDetails(objectid): Promise<GeekGame> {
  const url = `https://api.geekdo.com/api/geekmarket/products?ajax=1&nosession=1&objectid=${objectid}&objecttype=thing&pageid=1&showcount=1`
  return await got(url).json()
}

export async function getBestCoopGames(): Promise<string[]> {
  const url = `https://api.geekdo.com/api/geekitem/linkeditems?ajax=1&linkdata_index=boardgame&nosession=1&objectid=2023&objecttype=property&pageid=1&showcount=10000&sort=rank&subtype=boardgamemechanic`
  const response: GeekItem = await got(url).json()
  return response.items.map(({objectid}) => objectid as string)
}

async function getBestStrategyGames(): Promise<string[]> {
  const url = `https://boardgamegeek.com/geekitem.php?instanceid=6&objecttype=family&objectid=5497&subtype=boardgamesubdomain&pageid=1&sort=rank&view=boardgames&modulename=linkeditems&callback=&showcount=50&filters[categoryfilter]=&filters[mechanicfilter]=&action=linkeditems&ajax=1`
  const response = await got(url)
  const document = new JSDOM(response.body).window.document
  const links = Array.from(
    document.querySelectorAll('.geekitem_linkeditems_title a')
  )
  const ids = links.map((link) => link.getAttribute('href').split('/')[2])

  return ids
}

async function getAllGameDetails(ids: string[]) {
  return await Promise.all(ids.map((id) => getGameDetails(id)))
}

async function main() {
  const bestStrategy = await getBestStrategyGames()
  // const bestCoop = await getBestCoopGames()
  const allGameDetails = await getAllGameDetails(bestStrategy)

  const data = allGameDetails.map((details) => {
    return {
      href: details.linkeditem.href,
      name: details.linkeditem.name,
      image:
        details.linkeditem.image.images.mediacard['src@2x'] ||
        details.linkeditem.image.images.mediacard.src
    }
  })
  writeFileSync('./coop-games.json', JSON.stringify(data, null, '  '))
}

main()
