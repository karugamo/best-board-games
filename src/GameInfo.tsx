import {round, times} from 'lodash'
import React, {ReactNode} from 'react'
import styled from 'styled-components'
import {GeekGame} from '../types'

export default function GameInfo({game}: {game: GeekGame}) {
  const {minAge, playtime, players, weight, rating, id} = game
  return (
    <Container>
      <InfoBar>
        <InfoCell label="Age">{minAge}+</InfoCell>
        <PlayTime minutes={playtime as Range} />
        <Players number={players as Range} />
        <InfoCell label="Difficulty">
          <Difficulty value={weight} />
        </InfoCell>
        <Link
          target="_blank"
          rel="noopener"
          title="BordGameGeek Score"
          href={`https://boardgamegeek.com/boardgame/${id}/kemet`}
        >
          <InfoCell label="Rating">{round(rating, 1)}</InfoCell>
        </Link>
      </InfoBar>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  @media (max-width: 600px) {
    margin-bottom: 12px;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: unset;

  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  :visited {
    color: unset;
  }
`

function PlayTime({minutes}: {minutes: Range}) {
  let start: number
  let end: number
  let type: string
  if (minutes[0] >= 60) {
    start = Math.round(minutes[0] / 60)
    end = Math.round(minutes[1] / 60)
    type = 'h'
  } else {
    start = minutes[0]
    end = minutes[1]
    type = 'min'
  }
  return (
    <InfoCell label={'Time'}>
      {(start === end ? start : `${start}-${end}`) + type}
    </InfoCell>
  )
}

function Players({number}: {number: Range}) {
  return (
    <InfoCell label="Players">
      {number[0] === number[1] ? number[0] + '' : `${number[0]}-${number[1]}`}
    </InfoCell>
  )
}

type Range = [number, number]

function Difficulty({value}: {value: number}) {
  const activeColor = 'rgba(255, 255,255, 0.9)'
  const inactiveColor = 'rgba(255, 255, 255, 0.235)'
  const size = 5

  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 25 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Difficulty: {value}</title>
      {times(size).map((number) => (
        <rect
          key={number}
          fill={Math.round(value) > number ? activeColor : inactiveColor}
          y={16 - 4 * number}
          x={5 * number}
          width={3}
          height={4 + 4 * number}
          radius={2}
        />
      ))}
    </svg>
  )
}

const InfoBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

function InfoCell({children, label}: {children: ReactNode; label: string}) {
  return (
    <InfoCellContainer>
      <InfoCellLabel>{label}</InfoCellLabel>
      <InfoCellMain>{children}</InfoCellMain>
    </InfoCellContainer>
  )
}

const InfoCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  padding-bottom: 5px;
`

const InfoCellLabel = styled.label`
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  font-size: 0.8em;
  text-align: center;
`

const InfoCellMain = styled.div`
  font-size: 1.2rem;
  line-height: 35px;
`
