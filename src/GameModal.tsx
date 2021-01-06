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
        <Close onClick={onClose}>
          <CloseIcon />
        </Close>
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
          <InverseButton onClick={() => window.open(amazonLink)}>
            Buy on Amazon US
          </InverseButton>
        </BelowVideo>
      </InnerModal>
    </Modal>
  )
}

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`

function CloseIcon() {
  return (
    <svg
      width={25}
      height={25}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  @media (max-width: 600px) {
    margin-bottom: 12px;
  }
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
  color: rgba(255, 255, 255, 0.6);
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

function createAmazonLink(
  asin: string | undefined,
  backupSearch: string
): string {
  return asin
    ? `https://www.amazon.com/dp/${asin}?tag=karugamo-20`
    : `https://www.amazon.com/s?k=${encodeURI(backupSearch)}&tag=karugamo-20`
}

const Title = styled.h3`
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

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const InnerModal = styled.div`
  background-color: #080913;
  color: rgba(255, 255, 255, 0.9);
  position: relative;

  @media (max-width: 600px) {
    height: 100vh;
  }
`

const InverseButton = styled(Button)`
  color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.9);
  outline: 0;
  white-space: nowrap;

  :hover {
    background-color: transparent;
  }
`
