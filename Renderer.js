class Renderer {
  constructor() {
    this.view = {
      $boardTemplate: $("#board-template"),
      $boardContainer: $("#board"),
      $scoresTemplate: $("#scores-template"),
      $scoresContainer: $("#scores"),
      $gameOverTemplate: $("#game-over-template"),
      $gameOverContainer: $("#game-over-container"),
    }
  }
  getTemplateHtml($template, data) {
    const source = $template.html()
    const template = Handlebars.compile(source)
    const newHTML = template(data)
    return newHTML
  }
  renderScores(scores) {
    const $container = this.view.$scoresContainer
    const newHTML = this.getTemplateHtml(this.view.$scoresTemplate, { scores })
    $container.empty().append(newHTML)
  }
  renderBoard(board) {
    const $container = this.view.$boardContainer
    const newHTML = this.getTemplateHtml(this.view.$boardTemplate, { board })
    $container.empty().append(newHTML)
  }
  renderGameOver(game) {
    const $container = this.view.$gameOverContainer
    const newHTML = this.getTemplateHtml(this.view.$gameOverTemplate, game)
    $container.empty().append(newHTML)
    $("#game-over-modal-content").attr("data-winner-id",game.winner)
    $("#game-over-modal").removeClass("hidden")
  }
}