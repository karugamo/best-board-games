import React, {useEffect, useState} from 'react'
import {Range} from 'rc-slider'
import styled from 'styled-components'
import allGames from '../games.json'
import Game from './Game'
import Logo from './Logo'
import 'rc-slider/assets/index.css'
import About from './About'
import FilterTags, {Filter} from './FilterTags'
import {GeekGame} from '../types'
import {shuffle} from 'lodash'

export default function App() {
  const [complexityRange, setComplexityRange] = useState([1, 3])
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [games, setGames] = useState<GeekGame[]>(allGames)

  useFilterGames()

  return (
    <Main>
      <Logo />
      <OptionsBar>
        <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
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
        <Button onClick={shuffleGames}>Shuffle</Button>
      </OptionsBar>

      <GamesContainer>
        {games
          .filter((game) => inRange(Math.round(game.weight), complexityRange))
          .map((game) => {
            return <Game key={game.name} game={game} />
          })}
      </GamesContainer>
      <About />
    </Main>
  )

  function useFilterGames() {
    useEffect(() => {
      const filteredGames = activeFilters.reduce(
        (acc, filter) => acc.filter(filter.function),
        allGames
      )

      setGames(filteredGames)
    }, [activeFilters])
  }

  function shuffleGames() {
    setGames((games) => shuffle(games))
  }

  function onToggleFilter(filter: Filter) {
    const isActive = activeFilters.map(({name}) => name).includes(filter.name)

    setActiveFilters(
      isActive
        ? activeFilters.filter(({name}) => name !== filter.name)
        : [...activeFilters, filter]
    )
  }
}

function inRange(number: number, range: number[]) {
  return number >= range[0] && number <= range[1]
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

const OptionsBar = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1332px;
  width: 100%;

  @media (max-width: 1200px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`

const Button = styled.button`
  font-size: 20px;
  padding: 12px 40px;
  border: 2px solid #333;
  background-color: transparent;
  color: #333;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 7px;
  box-shadow: 0px 2px white;

  transition: background-color 0.2s, color 0.2s;

  :hover {
    background-color: #fffefd;
    color: black;
  }

  :active {
    transform: translate(0, 2px);
    box-shadow: 0px 0px white;
  }
`
