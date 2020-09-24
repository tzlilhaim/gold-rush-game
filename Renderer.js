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
    $container.empty()
    const newHTML = this.getTemplateHtml(this.view.$scoresTemplate, { scores })
    $container.append(newHTML)
  }
  renderBoard(board) {
    const $container = this.view.$boardContainer
    $container.empty()
    const newHTML = this.getTemplateHtml(this.view.$boardTemplate, { board })
    $container.append(newHTML)
  }
  renderGameOver(game) {
    const $container = this.view.$gameOverContainer
    $container.empty()

    Handlebars.registerHelper("isTie", function (value) {
      return value === 3
    })
    const newHTML = this.getTemplateHtml(this.view.$gameOverTemplate, game)
    $container.append(newHTML)
    $("#game-over-modal").removeClass("hidden")
  }
}
