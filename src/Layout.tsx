import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import initialGames from '../games.json'
import Game from './Game'
import Logo from './Logo'
import FilterTags, {Filter} from './FilterTags'
import {GeekGame} from '../types'
import {shuffle, times} from 'lodash'
import RangeSlider from './components/RangeSlider'
import SingleSlider from './components/SingleSlider'
import {About} from '@karugamo/components'
import Button from './components/Button'
import Head from './Head'
import {navigate} from 'gatsby'
import OverwhelminglyPositiveLink from './components/OverwhelminglyPositiveLink'

export default function Layout({children}) {
  const [complexityRange, setComplexityRange] = useState([1, 3])
  const [playerFilter, setPlayerFilter] = useState(4)
  const [playtimeFilter, setPlaytimeFilter] = useState(3)
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [allGames, setAllGames] = useState<GeekGame[]>(initialGames)
  const [games, setGames] = useState<GeekGame[]>(allGames)

  useFilterGames()

  return (
    <Main>
      <Head />
      <Logo />
      <OptionsBar>
        <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
        <Sliders>
          <RangeSlider
            value={complexityRange}
            onChange={setComplexityRange}
            min={1}
            max={5}
            marks={{1: 'very easy', 3: 'medium', 5: 'very  hard'}}
          />
          <SingleSlider
            value={playerFilter}
            onChange={setPlayerFilter}
            min={1}
            max={8}
            marks={playerSliderMarks}
          />
          <SingleSlider
            value={playtimeFilter}
            onChange={setPlaytimeFilter}
            min={1}
            max={5}
            marks={{
              1: '15 min',
              2: '30 min',
              3: '1 hour',
              4: '2 hours',
              5: '4 hours'
            }}
            track
          />
        </Sliders>
        <ShuffleButton onClick={shuffleGames}>Shuffle</ShuffleButton>
      </OptionsBar>

      <GamesContainer>
        {games
          .filter((game) => inRange(Math.round(game.weight), complexityRange))
          .filter((game) => inRange(playerFilter, game.players))
          .filter((game) =>
            inRange(playtimeFilterToMinutes[playtimeFilter], game.playtime)
          )
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
      <OverwhelminglyPositiveLink />
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
    }, [activeFilters, allGames])
  }

  function shuffleGames() {
    setGames((games) => shuffle(games))
    setAllGames((games) => shuffle(games))
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

const Sliders = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  min-width: 500px;

  @media (max-width: 500px) {
    min-width: 100vw;
  }
`

function encodeName(name) {
  return name
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/ /g, '_')
}

const playerSliderMarks = times(8).reduce((obj, n) => {
  if (n === 0) return {...obj, [n + 1]: '1 player'}
  if (n === 7) return {...obj, [n + 1]: '8 players'}
  return {...obj, [n + 1]: `${n + 1}`}
}, {})

const playtimeFilterToMinutes = {
  1: 15,
  2: 30,
  3: 60,
  4: 120,
  5: 240
}
