import {times} from 'lodash'
import React from 'react'
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

  const {youtubeId, asin, name, weight} = game

  const amazonLink = createAmazonLink(asin, name)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <InnerModal>
        {youtubeId && <YoutubeWidget videoId={youtubeId} />}
        <BelowVideo>
          <Title>{name}</Title>
          <Difficulty value={weight} />
          <Button onClick={() => window.open(amazonLink)}>
            Buy on Amazon US
          </Button>
        </BelowVideo>
      </InnerModal>
    </Modal>
  )
}

function Difficulty({value}: {value: number}) {
  const activeColor = '#262e6e'
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
          fill={value > number ? activeColor : inactiveColor}
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
  margin: 0;
  font-weight: normal;
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
