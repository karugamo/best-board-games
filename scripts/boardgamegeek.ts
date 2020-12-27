import {writeFileSync} from 'fs'
import got from 'got'
import {GeekGame, GeekItem} from './boardgamegeek.type'

async function getGameDetails(objectid): Promise<GeekGame> {
  const url = `https://api.geekdo.com/api/geekmarket/products?ajax=1&nosession=1&objectid=${objectid}&objecttype=thing&pageid=1&showcount=1`
  return await got(url).json()
}

async function getBestCoopGames(): Promise<string[]> {
  const url = `https://api.geekdo.com/api/geekitem/linkeditems?ajax=1&linkdata_index=boardgame&nosession=1&objectid=2023&objecttype=property&pageid=1&showcount=10000&sort=rank&subtype=boardgamemechanic`
  const response: GeekItem = await got(url).json()
  return response.items.map(({objectid}) => objectid as string)
}

async function main() {
  const bestCoop = await getBestCoopGames()
  const allGameDetails = await Promise.all(
    bestCoop.map((id) => getGameDetails(id))
  )
  const data = allGameDetails.map((details) => {
    return {
      href: details.linkeditem.href,
      name: details.linkeditem.name,
      image:
        details.linkeditem.image.images.mediacard['src@2x'] ||
        details.linkeditem.image.images.mediacard.src
    }
  })
  // console.log(data)
  writeFileSync('./coop-games.json', JSON.stringify(data, null, '  '))
}

main()
