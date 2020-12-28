import React from 'react'
import styled from 'styled-components'
import games from '../coop-games.json'
import Game from './Game'
import Logo from './Logo'

export default function App() {
  return (
    <Main>
      <Logo />
      <h2>Strategy Games</h2>
      <GamesContainer>
        {games.map((game) => {
          const {name, href, image} = game
          return (
            <Game
              key={name}
              name={name}
              url={`https://boardgamegeek.com${href}`}
              image={image}
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
  color: #262e6e;
`

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
