import React from 'react'
import styled from 'styled-components'

export default function Game({image = '', url = ''}) {
  return (
    <GameContainer>
      <Link target="_blank" href={url}><Image src={image} /></Link>
    </GameContainer>
  )
}

const GameContainer = styled.div``

const Link = styled.a``

const Image = styled.img`
  width: 444px;
  height: 250px;
`
