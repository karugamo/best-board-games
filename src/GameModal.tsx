import {times} from 'lodash'
import React, {ReactNode} from 'react'
import styled from 'styled-components'
import {GeekGame} from '../types'
import Button from './components/Button'
import Modal from './Modal'
import YoutubeWidget from './YoutubeWidget'

type GameModalProps = {
  game: GeekGame | null
  onClose: () => void
  isOpen: boolean
}

export default function GameModal({game, isOpen, onClose}: GameModalProps) {
  if (!game) return null

  const {youtubeId, asin, name, weight, minAge, playtime, players} = game

  const amazonLink = createAmazonLink(asin, name)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <InnerModal>
        <Title>{name}</Title>
        {youtubeId && <YoutubeWidget videoId={youtubeId} />}
        <BelowVideo>
          <GameInfo>
            <InfoBar>
              <InfoCell label="Age">{minAge}+</InfoCell>
              <PlayTime minutes={playtime as Range} />
              <Players number={players as Range} />
              <InfoCell label="Difficulty">
                <Difficulty value={weight} />
              </InfoCell>
            </InfoBar>
          </GameInfo>
          <Button onClick={() => window.open(amazonLink)}>
            Buy on Amazon US
          </Button>
        </BelowVideo>
      </InnerModal>
    </Modal>
  )
}

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

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
`

const InfoCellLabel = styled.div`
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  font-size: 0.8em;
`

const InfoCellMain = styled.div`
  font-size: 1.2rem;
  line-height: 35px;
`

function PlayTime({minutes}: {minutes: Range}) {
  let start: number
  let end: number
  let type: string
  if (minutes[0] >= 60) {
    start = Math.round(minutes[0] / 60)
    end = Math.round(minutes[0] / 60)
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
  const activeColor = 'rgba(0, 0,0, 0.9)'
  const inactiveColor = 'rgba(32, 39, 92, 0.235)'
  const size = 5

  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 25 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Difficulty</title>
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

function createAmazonLink(
  asin: string | undefined,
  backupSearch: string
): string {
  return asin
    ? `https://www.amazon.com/dp/${asin}?tag=karugamo-20`
    : `https://www.amazon.com/s?k=${encodeURI(backupSearch)}&tag=karugamo-20`
}

const Title = styled.h3`
  color: #262e6e;
  font-size: 1.8rem;
  padding: 0.8rem 0;
  margin: 0;
  font-weight: normal;
  text-align: center;
`

const BelowVideo = styled.div`
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InnerModal = styled.div`
  background-color: #fff1d8;
`
