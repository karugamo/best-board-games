import React from 'react'
import styled from 'styled-components'
import {GeekGame} from '../types'
import Button from './components/Button'
import GameInfo from './GameInfo'
import Modal from './Modal'
import YoutubeWidget from './YoutubeWidget'

type GameModalProps = {
  game?: GeekGame
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
        <Title>{name}</Title>
        <Close onClick={onClose}>
          <CloseIcon />
        </Close>
        {youtubeId && <YoutubeWidget videoId={youtubeId} />}
        <BelowVideo>
          <GameInfo game={game} />
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
  padding: 0px 25px;
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
