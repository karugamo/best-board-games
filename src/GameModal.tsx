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

  const {youtubeId, asin, name} = game

  const amazonLink = createAmazonLink(asin, name)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <InnerModal>
        {youtubeId && <YoutubeWidget videoId={youtubeId} />}
        <BelowVideo>
          <Title>{name}</Title>
          <Button onClick={() => window.open(amazonLink)}>
            Buy on Amazon US
          </Button>
        </BelowVideo>
      </InnerModal>
    </Modal>
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
