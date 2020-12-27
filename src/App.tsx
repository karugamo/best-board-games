import React from 'react'
import styled from 'styled-components'
import games from '../games.json'
import Game from './Game'
import Logo from './Logo'

export default function App() {
  return (
    <Main>
      <Logo />
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  color: rgb(255, 255, 255, 0.9);
`

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
