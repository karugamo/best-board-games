import React from 'react'
import {GeekGame} from '../types'
import Modal from './Modal'
import YoutubeWidget from './YoutubeWidget'

type GameModalProps = {
  game?: GeekGame
  onClose: () => void
  isOpen: boolean
}

export default function GameModal({game, isOpen, onClose}: GameModalProps) {
  if (!game) return null

  const {youtubeId} = game

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {youtubeId && <YoutubeWidget videoId={youtubeId} />}
    </Modal>
  )
}
