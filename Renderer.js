class Renderer {
  constructor() {
    this.view = {
      $boardTemplate: $("#board-template"),
      $boardContainer: $("#board"),
      $scoresTemplate: $("#scores-template"),
      $scoresContainer: $("#scores"),
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
}
