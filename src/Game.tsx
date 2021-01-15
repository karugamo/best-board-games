import React, {useState} from 'react'
import styled from 'styled-components'
import {GeekGame} from '../types'
import GameInfo from './GameInfo'

type GameProps = {
  game: GeekGame
  onOpen: (game: GeekGame) => void
}

export default function Game({game, onOpen}: GameProps) {
  const [hovering, setHovering] = useState<boolean>(false)
  const {name, image, color} = game

  return (
    <GameContainer
      color={color}
      onClick={() => onOpen(game)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image src={image} alt={name} title={name} color={color} />
      {hovering && (
        <GameInfoContainer>
          <GameInfo game={game} />
        </GameInfoContainer>
      )}
    </GameContainer>
  )
}

const GameContainer = styled.div<{color: string}>`
  cursor: pointer;
  position: relative;
  background-color: ${({color}) => color};

  @media (max-width: 444px) {
    width: 100%;
  }

  @media (min-width: 520px) {
    transition: transform 0.1s ease-in-out;

    :hover {
      transform: scale(1.1);
      z-index: 10;
    }
  }
`

const Image = styled.img.attrs({width: '444', height: '250'})<{
  color: string
}>`
  width: 444px;
  height: 250px;
  object-fit: contain;
  background-color: ${(props) => props.color};

  @media (max-width: 444px) {
    width: 100%;
  }
`

const GameInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  background: black;
  width: 100%;
  color: white;
  opacity: 90%;
`
