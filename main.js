const board = new GoldRush()
const renderer = new Renderer()

const loadPlayersScores = function () {
  const playersScores = board.getPlayersScores()
  renderer.renderScores(playersScores)
}

const loadGameBoard = function () {
  const gameBoard = board.matrix
  renderer.renderBoard(gameBoard)
}

loadGameBoard()
loadPlayersScores()

// Handle player 1
$(document).keypress(function (e) {
  switch (e.which) {
    case 119:
      board.movePlayer(1, "up")
      loadGameBoard()
      loadPlayersScores()
      break
    case 115:
      board.movePlayer(1, "down")
      loadGameBoard()
      loadPlayersScores()
      break
    case 97:
      board.movePlayer(1, "left")
      loadGameBoard()
      loadPlayersScores()
      break
    case 100:
      board.movePlayer(1, "right")
      loadGameBoard()
      loadPlayersScores()
      break
  }
})

// Handle player 2
let isDown = false
$(document).keydown(function (e) {
  if (isDown) {
    return
  }
  isDown = true
  switch (e.which) {
    case 38:
      board.movePlayer(2, "up")
      loadGameBoard()
      loadPlayersScores()
      break
    case 40:
      board.movePlayer(2, "down")
      loadGameBoard()
      loadPlayersScores()
      break
    case 37:
      board.movePlayer(2, "left")
      loadGameBoard()
      loadPlayersScores()
      break
    case 39:
      board.movePlayer(2, "right")
      loadGameBoard()
      loadPlayersScores()
      break
  }
})

$(document).keyup(function () {
  isDown = false
})
