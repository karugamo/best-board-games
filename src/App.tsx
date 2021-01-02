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
          return <Game key={game.name} game={game} />
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
