class GoldRush {
  constructor(dimensions = 5) {
    this.dimensions = dimensions
    this.players = [
      { id: 1, position: { row: 0, col: 0 }, figure: 1, coins: 0 },
      {
        id: 2,
        position: { row: dimensions - 1, col: dimensions - 1 },
        figure: 2,
        coins: 0,
      },
    ]
    this.coins = {
      total: 0,
      positions: [],
      figure: "c",
    }
    this.cleared = { figure: "." }
    this.matrix = this.loadBoard(dimensions)
  }
  setPlayersPositionOnBoard(board = this.matrix) {
    this.players.forEach((p) => {
      board[p.position.row][p.position.col] = p.figure
    })
  }
  setCoinsPositionOnBoard(board = this.matrix) {
    this.coins.positions.forEach((pos) => {
      board[pos.row][pos.col] = this.coins.figure
    })
  }
  setBlocksPositionOnBoard(board = this.matrix) {
    this.coins.positions.forEach((pos) => {
      board[pos.row][pos.col] = this.coins.figure
    })
  }
  getClearedPositions(board = this.matrix) {
    let clearedPositions = []

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] == this.cleared.figure) {
          clearedPositions.push({ row, col })
        }
      }
    }
    return clearedPositions
  }
  placeCoinsRandomly(board) {
    this.coins.total = this.dimensions
    const clearedPositions = this.getClearedPositions(board)
    for (let i = 0; i < this.coins.total; i++) {
      let position =
        clearedPositions[Math.floor(Math.random() * clearedPositions.length)]
      this.coins.positions.push(position)

      let posIndex = clearedPositions.findIndex(
        (pos) => pos.row === position.row && pos.col === position.col
      )
      clearedPositions.splice(posIndex, 1)
    }
    this.setCoinsPositionOnBoard(board)
  }
  loadBoard(dimensions = this.dimensions) {
    const board = []

    for (let r = 0; r < dimensions; r++) {
      board.push([])
      for (let c = 0; c < dimensions; c++) {
        board[r].push(this.cleared.figure)
      }
    }
    this.setPlayersPositionOnBoard(board)
    this.placeCoinsRandomly(board)
    return board
  }
  get(rowNum, colNum) {
    return this.matrix[rowNum][colNum]
  }
  clearPosition(rowNum, colNum) {
    this.matrix[rowNum][colNum] = this.cleared.figure
  }
  print() {
    let output = ""
    for (let row = 0; row < this.matrix.length; row++) {
      output += "\n"
      for (let col = 0; col < this.matrix[row].length; col++) {
        output += this.get(row, col) + "\t"
      }
    }
    console.log(output)
  }
  collectCoin(playerIndex) {
    const player = this.players[playerIndex]
    player.coins++
    const coinPosIndex = this.coins.positions.findIndex(
      (pos) =>
        pos.row === player.position.row && pos.col === player.position.col
    )
    this.coins.positions.splice(coinPosIndex, 1)
    this.coins.total--
  }
  checkIfCollectedCoin(playerIndex) {
    if (this.coins.total === 0) {
      return false
    } else {
      const isSamePositionAsPlayer = (pos) => {
        return pos.row === this.players[playerIndex].position.row &&
          pos.col === this.players[playerIndex].position.col
          ? true
          : false
      }
      if (this.coins.positions.some(isSamePositionAsPlayer)) {
        this.collectCoin(playerIndex)
      }
    }
  }
  isValidMove(playerIndex, direction) {
    const activePlayer = this.players[playerIndex]
    const otherPlayer = this.players[playerIndex === 1 ? 0 : 1]

    let isSpaceLeftUntillEdge = true,
      isAdjacentToOtherPlayer = false
    switch (direction) {
      case "down":
        isSpaceLeftUntillEdge = this.dimensions - 1 - activePlayer.position.row
        isAdjacentToOtherPlayer =
          otherPlayer.position.col === activePlayer.position.col &&
          otherPlayer.position.row - 1 === activePlayer.position.row
        break
      case "up":
        isSpaceLeftUntillEdge = 0 + activePlayer.position.row
        isAdjacentToOtherPlayer =
          otherPlayer.position.col === activePlayer.position.col &&
          activePlayer.position.row - 1 === otherPlayer.position.row
        break
      case "right":
        isSpaceLeftUntillEdge = this.dimensions - 1 - activePlayer.position.col
        isAdjacentToOtherPlayer =
          otherPlayer.position.row === activePlayer.position.row &&
          otherPlayer.position.col - 1 === activePlayer.position.col
        break
      case "left":
        isSpaceLeftUntillEdge = 0 + activePlayer.position.col
        isAdjacentToOtherPlayer =
          otherPlayer.position.row === activePlayer.position.row &&
          activePlayer.position.col - 1 === otherPlayer.position.col
        break
    }
    return !isSpaceLeftUntillEdge || isAdjacentToOtherPlayer ? false : true
  }
  movePlayer(playerId, direction) {
    let player, pIndex
    this.players.forEach((p, index) => {
      if (p.id === playerId) {
        player = p
        pIndex = index
      }
    })
    if (this.isValidMove(pIndex, direction)) {
      const changeRow = direction === "down" ? 1 : direction === "up" ? -1 : 0
      const changeCol =
        direction === "right" ? 1 : direction === "left" ? -1 : 0
      this.clearPosition(player.position.row, player.position.col)
      player.position.row += changeRow
      player.position.col += changeCol
      this.setPlayersPositionOnBoard()
      this.checkIfCollectedCoin(pIndex)
    }
  }
  getGameScore() {
    let winner = null
    if (!this.coins.total) {
      const player1 = this.players[0]
      const player2 = this.players[1]
      winner =
        player1.coins > player2.coins
          ? player1.id
          : player1.coins === player2.coins
          ? 3
          : player2.id
    }
    const scores = this.players.map((p) => {
      return { playerNum: p.id, score: p.coins }
    })
    return { scores, winner }
  }
}