import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import allGames from '../games.json'
import Game from './Game'
import Logo from './Logo'
import FilterTags, {Filter} from './FilterTags'
import {GeekGame} from '../types'
import {shuffle} from 'lodash'
import ComplexitySlider from './ComplexitySlider'
import {About} from '@karugamo/components'
import Button from './components/Button'
import Head from './Head'
import {navigate} from 'gatsby'

export default function Layout({children}) {
  const [complexityRange, setComplexityRange] = useState([1, 3])
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [games, setGames] = useState<GeekGame[]>(allGames)

  useFilterGames()

  return (
    <Main>
      <Head />
      <Logo />
      <OptionsBar>
        <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
        <ComplexitySlider
          value={complexityRange}
          onChange={setComplexityRange}
        />
        <ShuffleButton onClick={shuffleGames}>Shuffle</ShuffleButton>
      </OptionsBar>

      <GamesContainer>
        {games
          .filter((game) => inRange(Math.round(game.weight), complexityRange))
          .map((game) => {
            return (
              <Game
                key={game.name}
                game={game}
                onOpen={(game) => navigate(`/game/${encodeName(game.name)}`)}
              />
            )
          })}
      </GamesContainer>
      <About />
      {children}
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  color: #262e6e;

  @media (max-width: 444px) {
    margin: 0%;
  }
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
  max-width: 1351px;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 1351px) {
    justify-content: center;
    margin-bottom: 10px;
    flex-direction: column;
  }
`

const ShuffleButton = styled(Button)`
  @media (max-width: 1351px) {
    display: none;
  }
`

function encodeName(name) {
  return name
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/ /g, '_')
}
