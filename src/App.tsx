import React from 'react'
import {GeekGame} from '../types'
import GameModal from './GameModal'
import Helmet from 'react-helmet'

import {navigate} from 'gatsby'

type AppProps = {
  pageContext: {
    game?: GeekGame
  }
}

export default function App({pageContext: {game}}: AppProps) {
  return (
    <>
      <Helmet>
        <title>{`Best Board Games | ${
          game?.name ?? 'List of good board games'
        }`}</title>
      </Helmet>
      <GameModal
        isOpen={Boolean(game)}
        game={game}
        onClose={() => navigate('/')}
      />
    </>
  )
}
