const games = require('./games.json')

exports.createPages = async ({actions: {createPage}}) => {
  createPage({
    path: `/`,
    component: require.resolve('./src/App.tsx')
  })
  games.forEach((game) =>
    createPage({
      path: `/game/${encodeName(game.name)}`,
      component: require.resolve('./src/App.tsx'),
      context: {game}
    })
  )
}

function encodeName(name) {
  return name
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/ /g, '_')
}
