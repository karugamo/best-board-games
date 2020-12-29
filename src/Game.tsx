import React from 'react'
import styled from 'styled-components'
import {GeekGame} from '../types'

export default function Game(game: GeekGame) {
  const {href, name, image, color, asin} = game

  const link = asin ? `https://www.amazon.com/dp/${asin}?tag=karugamo-20` : href
  return (
    <GameContainer>
      <Link target="_blank" href={link}>
        <Image src={image} alt={name} title={name} color={color} />
      </Link>
    </GameContainer>
  )
}

const GameContainer = styled.div``

const Link = styled.a``

const Image = styled.img<{color: string}>`
  width: 444px;
  height: 250px;
  object-fit: contain;
  background-color: ${(props) => props.color};
`
