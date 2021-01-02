import React, {useState} from 'react'
import {Range} from 'rc-slider'
import styled from 'styled-components'
import games from '../games.json'
import Game from './Game'
import Logo from './Logo'
import 'rc-slider/assets/index.css'

export default function App() {
  const [complexityRange, setComplexityRange] = useState([1, 3])
  return (
    <Main>
      <Logo />
      <RangeContainer>
        <Range
          value={complexityRange}
          onChange={setComplexityRange}
          min={1}
          max={5}
          defaultValue={[0, 3]}
          marks={{1: 'very easy', 5: 'very complex'}}
          dots
        />
      </RangeContainer>
      <GamesContainer>
        {games
          .filter(
            (game) =>
              game.weight >= complexityRange[0] &&
              game.weight <= complexityRange[1]
          )
          .map((game) => {
            return <Game key={game.name} game={game} />
          })}
      </GamesContainer>
    </Main>
  )
}

const RangeContainer = styled.div`
  max-width: 500px;
  height: 50px;
  width: 100%;
`

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
