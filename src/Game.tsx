import React from 'react'
import styled from 'styled-components'

export default function Game({image = '', url = '', name = ''}) {
  return (
    <GameContainer>
      <Link target="_blank" href={url}>
        <Image src={image} alt={name} title={name} />
      </Link>
    </GameContainer>
  )
}

const GameContainer = styled.div``

const Link = styled.a``

const Image = styled.img`
  width: 444px;
  height: 250px;
  margin: 1rem;
`
