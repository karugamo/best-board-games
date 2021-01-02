export type GeekGame = {
  href: string
  name: string
  image: string
  color: string
  asin?: string
  weight: number
  minAge: number
  players: number[]
  playtime: number[]
  categories: string[]
}

export type GameId = string