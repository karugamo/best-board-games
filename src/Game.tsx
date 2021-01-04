import React from 'react'
import styled from 'styled-components'
import {GeekGame} from '../types'

export default function Game({game}: {game: GeekGame}) {
  const {href, name, image, color, asin, weight} = game

  const link = asin ? `https://www.amazon.com/dp/${asin}?tag=karugamo-20` : href
  return (
    <GameContainer>
      <Link target="_blank" href={link}>
        <Image
          src={image}
          alt={name}
          title={`${name} (Complexity: ${weight.toFixed(1)})`}
          color={color}
        />
      </Link>
    </GameContainer>
  )
}

const GameContainer = styled.div``

const Link = styled.a``

const Image = styled.img.attrs({width: '444', height: '250'})<{color: string}>`
  width: 444px;
  height: 250px;
  object-fit: contain;
  background-color: ${(props) => props.color};
`
