import React from 'react'
import styled from 'styled-components'
import games from '../games.json'
import Game from './Game'

export default function App() {
  return (
    <Main>
      <Title>THE BEST BOARD GAMES</Title>
      <GamesContainer>
        {games.map((game) => {
          const {
            name,
            href,
            images: {mediacard}
          } = game
          return (
            <Game
              key={name}
              url={`https://boardgamegeek.com${href}`}
              image={mediacard['src@2x']}
            />
          )
        })}
      </GamesContainer>
    </Main>
  )
}

const Title = styled.h1``

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: #242422;
`
