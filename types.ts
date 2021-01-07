export type GeekGame = {
  href: string
  name: string
  image: string
  color: string
  asin?: string
  weight: number
  minAge: number
  rating: number
  players: number[]
  playtime: number[]
  categories: string[]
  id: string
  youtubeId?: string
}

export type GameId = string
