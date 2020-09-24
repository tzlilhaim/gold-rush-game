const renderer = new Renderer()

// Global scope variables definition
let isGameActive = false
let isDown = false
let board

const loadGameScore = function () {
  const game = board.getGameScore()
  if (game.winner) {
    renderer.renderGameOver(game)
    isGameActive = false
  } else {
    renderer.renderScores(game.scores)
  }
}

const loadGameBoard = function () {
  !isGameActive ? (isGameActive = true) : null
  const gameBoard = board.matrix
  renderer.renderBoard(gameBoard)
}

const startNewGame = function () {
  board = new GoldRush()
  loadGameBoard()
  loadGameScore()
}

startNewGame()

// Handle player 1 keys
$(document).keypress(function (e) {
  if (!isGameActive) {
    return
  }
  switch (e.which) {
    case 119:
      board.movePlayer(1, "up")
      loadGameBoard()
      loadGameScore()
      break
    case 115:
      board.movePlayer(1, "down")
      loadGameBoard()
      loadGameScore()
      break
    case 97:
      board.movePlayer(1, "left")
      loadGameBoard()
      loadGameScore()
      break
    case 100:
      board.movePlayer(1, "right")
      loadGameBoard()
      loadGameScore()
      break
  }
})

// Handle player 2 keys
$(document).keydown(function (e) {
  if (isDown || !isGameActive) {
    return
  }
  isDown = true
  switch (e.which) {
    case 38:
      board.movePlayer(2, "up")
      loadGameBoard()
      loadGameScore()
      break
    case 40:
      board.movePlayer(2, "down")
      loadGameBoard()
      loadGameScore()
      break
    case 37:
      board.movePlayer(2, "left")
      loadGameBoard()
      loadGameScore()
      break
    case 39:
      board.movePlayer(2, "right")
      loadGameBoard()
      loadGameScore()
      break
  }
})

$(document).keyup(function () {
  isDown = false
})

$(".new-game").on("click", function () {
  startNewGame()
  $("#game-over-modal").addClass("hidden")
})
