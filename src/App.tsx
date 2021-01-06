import React from 'react'
import {GeekGame} from '../types'
import GameModal from './GameModal'

import {navigate} from 'gatsby'

type AppProps = {
  pageContext: {
    game?: GeekGame
  }
}

export default function App({pageContext: {game}}: AppProps) {
  return (
    <GameModal
      isOpen={Boolean(game)}
      game={game}
      onClose={() => navigate('/')}
    />
  )
}
