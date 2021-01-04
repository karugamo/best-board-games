import React from 'react'
import styled from 'styled-components'
import {GeekGame} from '../types'

type GameProps = {
  game: GeekGame
  onOpen: (game: GeekGame) => void
}

export default function Game({game, onOpen}: GameProps) {
  const {name, image, color, weight} = game

  return (
    <GameContainer onClick={() => onOpen(game)}>
      <Image
        src={image}
        alt={name}
        title={`${name} (Complexity: ${weight.toFixed(1)})`}
        color={color}
      />
    </GameContainer>
  )
}

const GameContainer = styled.div`
  cursor: pointer;
`

const Image = styled.img.attrs({width: '444', height: '250'})<{color: string}>`
  width: 444px;
  height: 250px;
  object-fit: contain;
  background-color: ${(props) => props.color};
`
