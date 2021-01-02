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

export default function App() {
  const [complexityRange, setComplexityRange] = useState([1, 3])
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [games, setGames] = useState<GeekGame[]>(allGames)

  useFilterGames()

  return (
    <Main>
      <Logo />
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
