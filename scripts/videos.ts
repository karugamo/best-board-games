import {writeFileSync} from 'fs'
import got from 'got/dist/source'

import games from '../games.json'
import {GeekGame} from '../types'

async function main() {
  await Promise.all(
    games.map(async (game: GeekGame) => {
      game.youtubeId = await getBestVideo(game.id)
      if (!game.youtubeId)
        console.log('No video found for', game.id, game.name, game.href)
    })
  )
  console.log('Write games.json')
  writeFileSync('./games.json', JSON.stringify(games, null, '  '))
}

async function getBestVideo(objectId: string) {
  const data: {videos: GeekVideo[]} = await got(
    `https://api.geekdo.com/api/videos?ajax=1&gallery=review&languageid=2184&nosession=1&objectid=${objectId}&objecttype=thing&pageid=1&showcount=36&sort=hot`
  ).json()
  const bestVideo = data.videos.filter(
    ({videohost}) => videohost === 'youtube'
  )[0]
  return bestVideo?.extvideoid
}

main()

const exampleGeekVideoResponse = {
  numrecommend: '19',
  videoid: '47009',
  postdate: '2014-06-03 18:33:48',
  objecttype: 'thing',
  objectid: '234',
  userid: '3821',
  videohost: 'youtube',
  extvideoid: '9ELCYdqZfrk',
  title: 'Session Report for our first game in about 6 years!',
  languageid: '2184',
  gallery: 'session',
  language: 'English',
  numcomments: '5',
  images: {
    square: 'https://i.ytimg.com/vi/9ELCYdqZfrk/default.jpg',
    thumb: 'https://i.ytimg.com/vi/9ELCYdqZfrk/hqdefault.jpg'
  },
  user: {
    username: 'Snowman',
    avatar: '1',
    avatarfile: 'avatar_id26320.gif'
  },
  duration: 'PT6M26S',
  href:
    '/video/47009/hannibal-rome-vs-carthage/session-report-our-first-game-about-6-years'
}

type GeekVideo = typeof exampleGeekVideoResponse
